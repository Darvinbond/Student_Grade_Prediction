from django.db import models

# Create your models here.

class PersonalInfo(models.Model):
    fname = models.CharField(max_length=20)
    lname = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.TextField()

    
class History(models.Model):
    Dalc = models.IntegerField()
    Walc = models.IntegerField()
    absences = models.IntegerField() 
    failures = models.IntegerField()
    Medu = models.IntegerField()
    G1 = models.IntegerField()
    G2 = models.IntegerField()
    grade = models.IntegerField()
    owner = models.EmailField()
    datee = models.DateTimeField(auto_now_add=True)