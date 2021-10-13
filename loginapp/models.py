from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from triadtrackerapp.models import DataCenter, Server, TriadCard

class CustomAccountManager(BaseUserManager):
    def create_user(self, username, char_first_name, char_last_name, server, data_center, password, **other_fields):
        
        if not username:
            raise ValueError(_('You must provide a username.'))

        server = Server.objects.get(id=server)
        data_center = DataCenter.objects.get(id=data_center)

        user = self.model(
            username=username,
            char_first_name=char_first_name,
            char_last_name=char_last_name,
            server=server,
            data_center=data_center,
            **other_fields
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, char_first_name, char_last_name, server, data_center, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.'
            )
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.'
            )
        
        return self.create_user(username, char_first_name, char_last_name, server, data_center, password, **other_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)

    char_first_name = models.CharField(max_length=150)
    char_last_name = models.CharField(max_length=150)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    data_center = models.ForeignKey(DataCenter, on_delete=models.CASCADE)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['char_first_name', 'char_last_name', 'server', 'data_center']

    def __str__(self):
        return self.username

class CardOwnership(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    card = models.ForeignKey(TriadCard, on_delete=models.CASCADE)
    owned = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)