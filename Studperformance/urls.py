"""Studperformance URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include

from api.views import HistoryView, PersonalInfoView
from rest_framework import routers
from .views import *
from django.views.decorators.csrf import csrf_exempt


router = routers.DefaultRouter()
router.register(r'personalinfo', PersonalInfoView, 'personalinfo')
router.register(r'history', HistoryView, 'history')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', geeks_view),
    path('login', csrf_exempt(login)),
    path('dashboard', dashboard),
    path('get_session', csrf_exempt(get_session)),
    path('predict', csrf_exempt(predict)),
    path('logout', csrf_exempt(logout)),
    path('edit', csrf_exempt(edit)),
    path('api/', include(router.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
