from django.contrib.auth.backends import BaseBackend
from .models import DiscordUser

class DiscordAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user) -> DiscordUser:
        find_user = DiscordUser.objects.filter(id=user['id'])
        if len(find_user) == 0:
            print('User was not found. Saving...')
            new_user = DiscordUser.objects.create_new_discord_user(user)
            return new_user
        print(find_user[0].discord_tag)
        return find_user[0]