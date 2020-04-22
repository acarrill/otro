# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Album(models.Model):
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.FloatField()
    img = models.CharField(max_length=200, default="PinkFloyd.jpeg")
    path = models.CharField(max_length=200, default="templates/search")

    def __str__(self):
        return self.name

class Order(models.Model):
    userName = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    product = models.CharField(max_length=100)
    numProducts = models.IntegerField()

    def __str__(self):
        return self.userName
