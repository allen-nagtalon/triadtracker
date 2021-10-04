from django.shortcuts import redirect
from django.http import HttpRequest, HttpResponse, JsonResponse

auth_url_discord = "https://discord.com/api/oauth2/authorize?client_id=894442886697996339&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcards&response_type=code&scope=identify"

# Create your views here.
def discord_login(request: HttpRequest):
    return redirect(auth_url_discord)