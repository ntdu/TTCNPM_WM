from django.urls import path

from . import views

app_name = 'administrations'
urlpatterns = [
  path('create-customer', views.createCustomer , name='createCustomer'),
  path('list-customer', views.listCustomer , name='listCustomer'),
]