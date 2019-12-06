import hmac
import json
from hashlib import sha1

from rest_framework import viewsets
from rest_framework.response import Response

from django.conf import settings
from django.utils.encoding import force_bytes
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseServerError

from .serializers import RepositorySerializer, CommitSerializer, AuthorSerializer
from .models import Repository, Commit, Author
from .services import create_repository, create_webhook


@login_required
def home(request):
    context = {
        'login': request.user.username,
    }

    return render(request, 'monitor/index.html', context)


class RepositoryViewSet(viewsets.ModelViewSet): # noqa
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    def get_queryset(self):
        user = self.request.user
        return user.watched_repositories.all().prefetch_related('commits', 'commits__author')

    def create(self, request, *args, **kwargs):
        repository = create_repository(
            full_repository_name=request.data['full_name'],
            user=request.user
        )

        serializer = RepositorySerializer(repository)

        return Response(serializer.data)

class CommitViewSet(viewsets.ModelViewSet): # noqa
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer

    def get_queryset(self):
        return Commit.objects.filter(
            repository__users__username=self.request.user.username
        ).select_related('author', 'repository').order_by('-date')



class AuthorViewSet(viewsets.ModelViewSet): # noqa
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def get_queryset(self):
        return Author.objects.filter(
            commits__repository__users__username=self.request.user.username
        )


@require_POST
@csrf_exempt
def hook(request):

    header_signature = request.META.get('HTTP_X_HUB_SIGNATURE')
    if header_signature is None:
        return HttpResponseForbidden('Permission denied.')

    sha_name, signature = header_signature.split('=')
    if sha_name != 'sha1':
        return HttpResponseServerError('Operation not supported.', status=501)

    mac = hmac.new(
        force_bytes(settings.GITHUB_WEBHOOK_KEY),
        msg=force_bytes(request.body),
        digestmod=sha1
    )

    if not hmac.compare_digest(force_bytes(mac.hexdigest()), force_bytes(signature)):
        return HttpResponseForbidden('Permission denied.')

    event = request.META.get('HTTP_X_GITHUB_EVENT', 'ping')

    if event == 'push':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        commits = body['commits']
        repository_full_name = body['repository']['full_name']

        repositories = Repository.objects.all()
        repository = get_object_or_404(repositories, full_name=repository_full_name)

        for commit in commits:

            author, _ = Author.objects.get_or_create(
                name=commit['author']['name'],
                email=commit['author']['email'],
            )

            Commit.objects.create(
                repository=repository,
                author=author,
                sha=commit['id'],
                message=commit['message'],
                date=commit['timestamp'],
                url=commit['url']
            )

        return HttpResponse('success')

    # Neither a ping or push
    return HttpResponse(status=204)
