import http.client
import json
from triadtrackerapp.serializers import TriadCardSerializer
from .models import TriadCard
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import redirect

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