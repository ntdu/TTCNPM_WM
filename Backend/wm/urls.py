from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('customer/', include('customer.urls')),
    path('admins/', include('administrations.urls')),
    path('warehouse/', include('warehouse.urls')),
]
