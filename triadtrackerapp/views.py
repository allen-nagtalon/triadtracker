import http.client
import json
from triadtrackerapp.serializers import TriadCardSerializer
from .models import TriadCard
from rest_framework import generics
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

        if TriadCard.objects.filter(id=card['id']) == 0:
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

class TriadCardList(generics.ListAPIView):
    queryset = TriadCard.objects.all()
    serializer_class = TriadCardSerializer