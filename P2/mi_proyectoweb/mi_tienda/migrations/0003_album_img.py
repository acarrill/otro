# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-05-19 21:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0002_auto_20190512_1747'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='img',
            field=models.CharField(default='static/PinkFloyd.jpeg', max_length=200),
        ),
    ]