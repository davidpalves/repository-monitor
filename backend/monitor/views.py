from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response
from monitor.serializers import RepositorySerializer, CommitSerializer, AuthorSerializer
from monitor.models import Repository, Commit, Author


@login_required
def home(request):
    context = {
        'login': request.user.username,
    }

    return render(request, 'monitor/index.html', context)


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    def list(self, request):
        queryset = request.user.repositories.all()
        serializer = RepositorySerializer(queryset, many=True)
        return Response(serializer.data)


class CommitViewSet(viewsets.ModelViewSet):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer

    def list(self, request):
        queryset = Commit.objects.filter(
            repository__owner=request.user
        ).order_by('-date')

        serializer = CommitSerializer(queryset, many=True)

        return Response(serializer.data)


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
