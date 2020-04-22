# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from mi_tienda.models import Album
from mi_tienda.models import Order
from mi_tienda.forms import OrderForm
from django.http import HttpResponseRedirect
# Create your views here.

def home_view (request):
    albums = Album.objects.all()
    return render(request, 'tienda.html', {'albums': albums})

def search_try (request):
    if request.method == 'GET':
        search_query = request.GET.get('search-box')
        print(search_query)
        results = (Album.objects.filter(name__icontains=search_query) |
                    Album.objects.filter(author__icontains=search_query))
    return render(request, 'search.html', {'results':results})

def album_view (request, album_name):
    arrayWords = album_name.split("_")
    album_name = ""
    # We must format our album name first
    for word in arrayWords:
        if album_name == "":
            album_name = word
        else:
            album_name = album_name + ' ' + word

    album = Album.objects.get(name=album_name)
    print(album.price)
    return render(request, 'album_page.html', {'album': album})

def order_request (request):
    print('hi')
    form = OrderForm()
    if request.method == 'POST':
        form = OrderForm(request.POST)
        print('post')
        if form.is_valid():
            cd = form.cleaned_data
            newOrder = Order(userName=cd['userName'], email=cd['email'],
                            product=cd['product'], numProducts=cd['numProducts'])
            print(newOrder.email)
            newOrder.save()
            return render(request, 'form.html', {'order': newOrder})

    return render(request, 'form.html', {'form': form})
