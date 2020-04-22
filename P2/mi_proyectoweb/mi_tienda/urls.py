from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^search', views.search_try),
    url(r'^form', views.order_request),
    url(r'^products/albums/(?P<album_name>\w{0,50})/$', views.album_view)
]
