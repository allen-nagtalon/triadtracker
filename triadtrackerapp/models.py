from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, URLValidator

class DataCenter(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Server(models.Model):
    name = models.CharField(max_length=50, unique=True)
    data_center = models.ForeignKey(DataCenter, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class TriadCard(models.Model):
    # Primary Key
    id = models.IntegerField(primary_key=True)

    # Basic Info
    name = models.CharField(max_length=255)
    icon = models.URLField(validators=[URLValidator()])
    image = models.URLField(validators=[URLValidator()])
    stars = models.IntegerField(
        validators = [
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    
    # Card Values
    topValue = models.IntegerField(
        validators = [
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    rightValue = models.IntegerField(
        validators = [
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    bottomValue = models.IntegerField(
        validators = [
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    leftValue = models.IntegerField(
        validators = [
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )