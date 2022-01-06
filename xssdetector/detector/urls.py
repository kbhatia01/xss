from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^sitecheck/$', views.sitecheck, name='sitecheck'),
    url(r'^metadata/$', views.MetaData.as_view(), name='add_meta_data')
]