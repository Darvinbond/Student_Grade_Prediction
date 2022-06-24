from .models import PersonalInfo, History
from rest_framework import fields, serializers



class PersonalInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'


class HistorySerializers(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'

class LoginSerializers(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields =( 'email', 'password')