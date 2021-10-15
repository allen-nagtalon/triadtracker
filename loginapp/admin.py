from django.contrib import admin
from loginapp.models import CardOwnership, CustomUser

admin.site.register(CustomUser)
admin.site.register(CardOwnership)