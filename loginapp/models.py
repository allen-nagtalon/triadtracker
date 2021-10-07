from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class DataCenter(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Server(models.Model):
    name = models.CharField(max_length=50, unique=True)
    data_center = models.ForeignKey(DataCenter, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)

    char_first_name = models.CharField(max_length=150)
    char_last_name = models.CharField(max_length=150)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    data_center = models.ForeignKey(DataCenter, on_delete=models.CASCADE)

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['char_first_name', 'char_last_name', 'server']

    def __str__(self):
        return self.username