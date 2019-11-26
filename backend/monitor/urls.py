from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.home, name='home')
]


router = DefaultRouter()
router.register('repositories', views.RepositoryViewSet, base_name='repositories')

urlpatterns = [
    path('api/v1/', include(router.urls)),
] + urlpatterns
