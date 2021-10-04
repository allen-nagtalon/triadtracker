from django.urls import path
from . import views

app_name = 'discordlogin'

urlpatterns = [
    path('user/', views.get_authenticated_user, name='get_authenticated_user'),
    path('login/', views.discord_login, name='oauth2'),
    path('login/redirect', views.discord_login_redirect, name='discord_login_redirect')
]