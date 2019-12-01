from rest_framework import serializers

from .models import Repository, Commit, Author


class RepositorySerializer(serializers.ModelSerializer):
    commits = serializers.SerializerMethodField()
    description = serializers.CharField(read_only=True)
    owner_login = serializers.CharField(read_only=True)
    url = serializers.URLField(read_only=True)

    class Meta:
        model = Repository
        fields = (
            'id',
            'full_name',
            'owner_login',
            'description',
            'commits',
            'url'
        )

    def get_commits(self, obj):
        commits = Commit.objects.filter(repository_id=obj.id)
        serializer = CommitSerializer(commits, many=True)
        return serializer.data


class RepositoryNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = (
            'id',
            'full_name'
        )


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'email',)


class CommitSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    repository = RepositoryNameIdSerializer(read_only=True)
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
