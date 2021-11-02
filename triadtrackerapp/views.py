import http.client
import json
import re
import os

from django.http.response import JsonResponse
from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import redirect
from django.views import View

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from triadtrackerapp.serializers import DataCenterSerializer, ServerSerializer, TriadCardSerializer
from triadtrackerapp.models import TriadCard, DataCenter, Server
from loginapp.serializers import CardOwnershipSerializer
from loginapp.models import CardOwnership

regex = re.compile('^HTTP_')

def populateServers(request):
    conn = http.client.HTTPSConnection("xivapi.com")
    payload = ''
    headers = {}
    conn.request("GET", "/servers/dc", payload, headers)

    res = conn.getresponse()
    data = res.read()
    parsedData = json.loads(data)
    
    for data_center_name in parsedData:
        query = DataCenter.objects.filter(name=data_center_name)
        if len(query) == 0:
            data_center = DataCenter.objects.create(name=data_center_name)
        else: data_center = query[0]
        print("Data Center:", data_center)
        for server_name in parsedData[data_center_name]:
            query = Server.objects.filter(name=server_name)
            if len(query) == 0:
                server = Server.objects.create(name=server_name, data_center=data_center)
            else: server = query[0]
            print("-", server)

    return JsonResponse(parsedData)

def populateCards(request):
    conn = http.client.HTTPSConnection("triad.raelys.com")
    payload = ''
    headers = {}
    conn.request("GET", "/api/cards", payload, headers)

    res = conn.getresponse()
    data = res.read()
    parsedData = json.loads(data)
    print(len(parsedData['results']))
    
    for card in parsedData['results']:
        values = card['stats']['numeric']

        if len(TriadCard.objects.filter(id=card['id'])) == 0:
            TriadCard.objects.create(
                id = card['id'],
                name = card['name'],
                stars = card['stars'],
                icon = card['icon'],
                image = card['image'],
                topValue = values['top'],
                rightValue = values['right'],
                bottomValue = values['bottom'],
                leftValue = values['bottom'],
            )
            print("Card #{}: \"{}\" added.".format(card['id'], card['name']))
        else:
            print("Card #{}: \"{}\" is already in database.".format(card['id'], card['name']))

    return redirect("http://localhost:3000/cards")

class TriadCardList(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        cards = TriadCard.objects.all()
        serializer = TriadCardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        name = request.data.get('name')
        stars = request.data.get('stars')
        
        cards = TriadCard.objects.all()
        
        if name != '':
            cards = cards.filter(name__contains=name)

        if stars != 0:
            cards = cards.filter(stars=stars)

        serializer = TriadCardSerializer(cards, many=True)
        return Response(serializer.data)

class ServerList(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class DataCenterList(ListAPIView):
    permission_classes = [AllowAny]
    queryset = DataCenter.objects.all()
    serializer_class = DataCenterSerializer

class CardOwnershipList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        users_cards = CardOwnership.objects.filter(user=request.user.id)
        serializer = CardOwnershipSerializer(users_cards, many=True)
        
        return Response(serializer.data)

class CardOwnershipUpdate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        ownership = CardOwnership.objects.filter(user=request.user.id, card=request.data.get('card'))
        if len(ownership) != 0:
            ownership[0].owned = request.data.get('value')
            ownership[0].save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        
        else:
            return HttpResponseNotFound()