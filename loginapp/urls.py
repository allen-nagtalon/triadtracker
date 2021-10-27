from django.urls import path
from .views import BlacklistTokenView, CustomUserCreate, UserDetail

app_name = 'loginapp'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('auth-detail/', UserDetail.as_view(), name='user_detail')
]