from django.urls import path

from . import views

app_name = 'warehouse'
urlpatterns = [
  path('list-material', views.listMaterial , name='listMaterial'),
  path('get-material', views.getMaterial , name='getMaterial'),
  path('create-material', views.createMaterial , name='createMaterial'),
  path('update-material', views.updateMaterial , name='updateMaterial'),
  path('delete-material', views.deleteMaterial , name='deleteMaterial'),
  path('push-inventory', views.pushInventory , name='pushInventory'),
  path('delete-inventory', views.deleteInventory , name='deleteInventory'),
  path('list-inventory', views.listInventory , name='listInventory'),
  path('get-inventory', views.getInventory , name='getInventory'),

]