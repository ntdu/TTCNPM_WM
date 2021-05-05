from django.urls import path

from . import views

app_name = 'warehouse'
urlpatterns = [
  path('list-material', views.listMaterial , name='listMaterial'),
]