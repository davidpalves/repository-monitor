from datetime import datetime, timedelta

from github import Github, UnknownObjectException, GithubException
from rest_framework.exceptions import ValidationError, NotFound
from django.conf import settings

from .models import Repository, Author, Commit


def create_repository(user, full_repository_name):
    github = Github(user.github.access_token)

    try:
        name = full_repository_name.split('/')[1]
        owner = full_repository_name.split('/')[0]

        if Repository.objects.filter(name=name,
                                     owner_login=owner,
                                     users__username=user.username):
            raise ValidationError(
                f'The repository {name} was already added.')

        retrieved_repository = github.get_user(owner).get_repo(name)

        create_webhook(name=name, user=user)

        repository = Repository.objects.create(
            full_name=retrieved_repository.full_name,
            name=retrieved_repository.name,
            description=retrieved_repository.description,
            owner_login=retrieved_repository.owner.login,
            url=retrieved_repository.html_url
        )

        last_month = datetime.today() - timedelta(days=30)

        commits = retrieved_repository.get_commits(since=last_month)

        commits_list = []

        for commit in commits:
            author, _ = Author.objects.get_or_create(
                name=commit.commit.author.name,
                email=commit.commit.author.email,
            )
            commit_to_be_added = Commit(
                repository=repository,
                author=author,
                sha=commit.sha,
                message=commit.commit.message,
                date=commit.commit.author.date,
                url=commit. html_url
            )

            commits_list.append(commit_to_be_added)

        Commit.objects.bulk_create(commits_list)

        repository.users.add(user)

        return repository

    except IndexError:
        raise ValidationError('Repository name not in the correct format.')

    except UnknownObjectException:
        raise NotFound('Repository not found.')


def create_webhook(user, name):
    github = Github(user.github.access_token)

    try:
        hook_configs = {}
        hook_configs['url'] = settings.APP_BASE_URL + '/hooks/'
        hook_configs['content_type'] = 'json'
        hook_configs['secret'] = settings.GITHUB_WEBHOOK_KEY

        retrieved_repository = github.get_user().get_repo(name)

        retrieved_repository.create_hook(
            name="web",
            config=hook_configs,
            events=["push"],
            active=True
        )

    except GithubException as ex:
        print(ex.data)
        if 'errors' in ex.data:
            for error in ex.data['errors']:
                if error['message'] == 'Hook already exists on this repository':
                    return
        raise NotFound("Could not create webhook.\
                        Please, check your repository permissions")
