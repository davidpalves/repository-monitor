from rest_framework import serializers
from .models import Repository, Commit, Author


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('id', 'full_name')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'email',)


class CommitSerializer(serializers.ModelSerializer):
    repository = RepositorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    date = serializers.DateTimeField(format="%b, %d, %Y at %H:%M:%S")

    class Meta:
        model = Commit
        fields = ('id', 'sha', 'author', 'date', 'message', 'url', 'repository')
