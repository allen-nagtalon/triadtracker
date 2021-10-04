from django.shortcuts import redirect
from django.http import HttpRequest, HttpResponse, JsonResponse
import requests
import os

auth_url_discord = "https://discord.com/api/oauth2/authorize?client_id=894442886697996339&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Flogin%2Fredirect&response_type=code&scope=identify"

# Create your views here.
def discord_login(request: HttpRequest):
    return redirect(auth_url_discord)

def discord_login_redirect(request: HttpRequest):
    code = request.GET.get('code')

    user = exchange_code(code)
    return JsonResponse({ "user": user })

def exchange_code(code: str):
    data = {
        "client_id": os.environ['CLIENT_ID'],
        "client_secret": os.environ['CLIENT_SECRET'],
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:8000/oauth2/login/redirect",
        "scope": "identify"
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post("https://discord.com/api/oauth2/token", data=data, headers=headers)
    credentials = response.json()
    access_token = credentials['access_token']
    response = requests.get("https://discord.com/api/v6/users/@me", headers={
        'Authorization': 'Bearer %s' % access_token
    })
    user = response.json()
    return user