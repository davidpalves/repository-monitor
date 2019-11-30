from rest_framework import serializers

from .models import Repository, Commit, Author


class RepositorySerializer(serializers.ModelSerializer):
    description = serializers.CharField(read_only=True)
    owner_login = serializers.CharField(read_only=True)
    url = serializers.URLField(read_only=True)

    class Meta:
        model = Repository
        depth = 2
        fields = (
            'id',
            'full_name',
            'owner_login',
            'description',
            'commits',
            'url'
        )


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'email',)


class CommitSerializer(serializers.ModelSerializer):
    repository = RepositorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    date = serializers.DateTimeField(format="%b %d, %Y at %H:%M:%S")

    class Meta:
        model = Commit
        fields = (
            'id',
            'sha',
            'author',
            'date',
            'message',
            'url',
            'repository'
        )
