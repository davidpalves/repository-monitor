from github import Github, UnknownObjectException
from rest_framework.exceptions import ValidationError, NotFound
from .models import Repository, Author, Commit
from datetime import datetime, timedelta


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

    except UnknownObjectException:
        raise NotFound('Repository not found.')
