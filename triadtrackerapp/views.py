import http.client
import json
from triadtrackerapp.models import TriadCard
from django.shortcuts import render

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

        new_card = TriadCard.objects.create(
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

    return render(request, "index.html")