from social_django.models import DjangoStorage

from .models import GithubUser


class GithubSocialStorage(DjangoStorage):
    user = GithubUser
