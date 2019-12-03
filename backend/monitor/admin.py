from django.contrib import admin

from .models import Repository, Commit, Author


admin.site.register(Repository)
admin.site.register(Author)
admin.site.register(Commit)
