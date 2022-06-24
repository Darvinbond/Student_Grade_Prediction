from django.shortcuts import render
from .serializers import *
from .views import *
from rest_framework import viewsets

# Create your views here.

class PersonalInfoView(viewsets.ModelViewSet):
    serializer_class = PersonalInfoSerializers
    queryset = PersonalInfo.objects.all()


class HistoryView(viewsets.ModelViewSet):
    serializer_class = HistorySerializers
    queryset = History.objects.order_by("id").reverse()