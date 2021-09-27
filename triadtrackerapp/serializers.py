from rest_framework import serializers
from .models import TriadCard

class TriadCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriadCard
        fields = ['id', 'name', 'icon', 'image', 'stars', 'topValue', 'rightValue', 'bottomValue', 'leftValue']