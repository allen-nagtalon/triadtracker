from django.urls import path
from . import views

app_name = 'discordlogin'

urlpatterns = [
    path('login/', views.discord_login, name='oauth2'),
    path('login/redirect', views.discord_login_redirect, name='discord_login_redirect')
]