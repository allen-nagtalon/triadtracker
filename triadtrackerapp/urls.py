from django.urls import path
from . import views

app_name = 'triadtracker'

urlpatterns = [
    path('populate-cards/', views.populateCards),
    path('populate-servers/', views.populateServers),
    path('cards/', views.TriadCardList.as_view()),
    path('servers/', views.ServerList.as_view()),
    path('data-centers/', views.DataCenterList.as_view()),
    path('owned-cards/', views.CardOwnershipList.as_view())
]