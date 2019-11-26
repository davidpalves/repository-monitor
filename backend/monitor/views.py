from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response
from monitor.serializers import RepositorySerializer, CommitSerializer
from monitor.models import Repository, Commit


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
