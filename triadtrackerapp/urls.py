from django.urls import path
from . import views

app_name = 'triadtracker'

urlpatterns = [
    path('populate-cards', views.populateCards),
]