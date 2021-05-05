from django.urls import path

from . import views

app_name = 'warehouse'
urlpatterns = [
  path('list-material', views.listMaterial , name='listMaterial'),
  path('get-material', views.getMaterial , name='getMaterial'),
  path('create-material', views.createMaterial , name='createMaterial'),
  path('update-material', views.updateMaterial , name='updateMaterial'),
]