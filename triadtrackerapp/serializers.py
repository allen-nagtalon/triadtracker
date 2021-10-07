from rest_framework import serializers
from .models import TriadCard, DataCenter, Server

class TriadCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriadCard
        fields = ['id', 'name', 'icon', 'image', 'stars', 'topValue', 'rightValue', 'bottomValue', 'leftValue']
    
class DataCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCenter
        fields = ['id', 'name']

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'data_center']