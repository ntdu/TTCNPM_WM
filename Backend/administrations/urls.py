from django.urls import path

from . import views

app_name = 'administrations'
urlpatterns = [
  path('create-customer', views.createCustomer , name='createCustomer'),
  path('list-customer', views.listCustomer , name='listCustomer'),
  path('delete-customer', views.deleteCustomer , name='deleteCustomer'),
  path('update-customer', views.updateCustomer , name='updateCustomer'),
  path('get-customer', views.getCustomer , name='getCustomer'),
]