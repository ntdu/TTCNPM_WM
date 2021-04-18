from django.urls import path

from . import views

app_name = 'customer'
urlpatterns = [
  path('get-customer', views.getCustomer , name='getCustomer'),
  path('update-customer', views.updateCustomer , name='updateCustomer'),
  path('update-password', views.updatePassword , name='updatePassword'),
]