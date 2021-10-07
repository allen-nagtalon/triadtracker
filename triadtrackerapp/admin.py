from django.contrib import admin
from .models import DataCenter, Server, TriadCard

# Register your models here.
admin.site.register(TriadCard)
admin.site.register(DataCenter)
admin.site.register(Server)