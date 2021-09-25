import http.client
import json
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
    return render(request, "index.html")