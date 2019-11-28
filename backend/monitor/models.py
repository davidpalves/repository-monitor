from django.db import models

from common.models import IndexedTimeStampedModel


class Repository(IndexedTimeStampedModel):
    users = models.ManyToManyField(
        'users.User',
        related_name='watched_repositories'
    )
    full_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True,blank=True)
    owner_login = models.CharField(max_length=255)
    owner_avatar_url = models.CharField(max_length=255, blank=True)
    url = models.URLField()

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = 'Repository'
        verbose_name_plural = 'Repositories'


class Author(IndexedTimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.name

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
