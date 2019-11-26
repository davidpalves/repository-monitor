from rest_framework import serializers
from .models import Repository, Commit, Author


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('id', 'owner_username', 'name', 'description')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'username', 'email', 'avatar_url')


class CommitSerializer(serializers.ModelSerializer):
    repository = RepositorySerializer(read_only=True)

    class Meta:
        model = Commit
        fields = ('id', 'sha', 'message', 'repository')
