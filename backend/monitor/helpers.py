from github import Github, UnknownObjectException, GithubException
from rest_framework.exceptions import ValidationError, NotFound
from datetime import datetime, timedelta
from django.conf import settings

from .models import Repository, Author, Commit


def create_repository(user, full_repository_name):
    github = Github(user.github.access_token)

    try:
        if Repository.objects.filter(full_name=full_repository_name,
                                     users__username=user.username):
            raise ValidationError("Repository already added")

        retrieved_repository = github.get_repo(full_repository_name)

        repository = Repository.objects.create(
            full_name=retrieved_repository.full_name,
            description=retrieved_repository.description,
            owner_login=retrieved_repository.owner.login,
            owner_avatar_url=retrieved_repository.owner.avatar_url,
            url=retrieved_repository.html_url
        )

        last_month = datetime.today() - timedelta(days=30)

        commits = retrieved_repository.get_commits(since=last_month)

        for commit in commits:
            author, _ = Author.objects.get_or_create(
                name=commit.commit.author.name,
                email=commit.commit.author.email,
            )
            Commit.objects.create(
                repository=repository,
                author=author,
                sha=commit.sha,
                message=commit.commit.message,
                date=commit.commit.author.date,
                url=commit. html_url
            )

        repository.users.add(user)
        repository.save()

        return repository

    except UnknownObjectException:
        raise NotFound('Repository not found.')


def create_webhook(user, full_name_repository):
    github = Github(user.github.access_token)

    try:
        hook_configs = {}
        hook_configs['url'] = settings.APP_BASE_URL + '/hooks/'
        hook_configs['content_type'] = 'json'
        hook_configs['secret'] = settings.GITHUB_WEBHOOK_KEY

        repo = github.get_repo(full_name_repository)
        repo.create_hook(name="web", config=hook_configs, events=["push"], active=True)
    except GithubException as ex:
        # Validate if hook already exists:
        for error in ex.data['errors']:
            if error['message'] == 'Hook already exists on this repository':
                return
        raise NotFound("Could not create webhook.")
