from django.shortcuts import render
from django.views import View
from django.urls import reverse
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required


# Create your views here.

@login_required
def home(request):
    context = {
        # 'avatar': request.user.github_avatar_url,
        'login': request.user.username,
    }
    return render(request, 'monitor/index.html', context)
