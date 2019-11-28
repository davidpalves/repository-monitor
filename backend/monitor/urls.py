from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('hooks/', views.hook, name='hook'),

]


router = DefaultRouter()
router.register('repositories', views.RepositoryViewSet, base_name='repositories')
router.register('commits', views.CommitViewSet, base_name='commits')
router.register('authors', views.AuthorViewSet, base_name='authors')

urlpatterns = [
    path('api/v1/', include(router.urls)),
] + urlpatterns
