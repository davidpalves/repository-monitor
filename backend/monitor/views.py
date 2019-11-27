from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import RepositorySerializer, CommitSerializer, AuthorSerializer
from .models import Repository, Commit, Author
from .helpers import create_repository


@login_required
def home(request):
    context = {
        'login': request.user.username,
    }

    return render(request, 'monitor/index.html', context)


class RepositoryViewSet(viewsets.ModelViewSet): # noqa
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    def list(self, request, *args, **kwargs):
        queryset = request.user.watched_repositories.all()
        serializer = RepositorySerializer(queryset, many=True)
        return Response(serializer.data)

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

    def list(self, request):
        queryset = Commit.objects.filter(
            repository__users__username=request.user.username
        ).order_by('-date')

        serializer = CommitSerializer(queryset, many=True)

        return Response(serializer.data)


class AuthorViewSet(viewsets.ModelViewSet): #noqa
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
