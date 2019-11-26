from django.db import models

from common.models import IndexedTimeStampedModel


class Repository(IndexedTimeStampedModel):
    owner = models.ForeignKey(
        'users.User',
        related_name='repositories',
        on_delete=models.CASCADE
    )
    users = models.ManyToManyField(
        'users.User',
        related_name='watched_repositories'
    )
    name = models.CharField(max_length=255)
    owner_username = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.owner.username}/{self.name}'

    class Meta:
        verbose_name = 'Repository'
        verbose_name_plural = 'Repositories'


class Author(IndexedTimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    username = models.CharField(max_length=255, blank=False, null=False)
    avatar_url = models.URLField()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'


class Commit(IndexedTimeStampedModel):
    repository = models.ForeignKey(
        'Repository',
        related_name='commits',
        on_delete=models.CASCADE
    )

    author = models.ForeignKey(
        'Author',
        related_name='commits',
        on_delete=models.SET_NULL,
        null=True
    )

    sha = models.CharField(max_length=255)
    message = models.CharField(max_length=255)
    date = models.DateTimeField()
    url = models.URLField()

    def __str__(self):
        return self.sha

    class Meta:
        ordering = ('-date', )
        verbose_name = 'Commit'
        verbose_name_plural = 'Commits'
