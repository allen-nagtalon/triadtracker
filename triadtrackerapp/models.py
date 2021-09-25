from django.db import models

class TriadCard(models.Model):
    name = models.CharField(max_length=255)
    stars = models.IntegerField()
    icon = models.URLField()
    image = models.URLField()
    
    topValue = models.IntegerField()
    rightValue = models.IntegerField()
    bottomValue = models.IntegerField()
    leftValue = models.IntegerField()