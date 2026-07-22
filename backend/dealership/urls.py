from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "name": "AutoVault Car Dealership API",
        "status": "online",
        "version": "1.0.0"
    })

urlpatterns = [
    path('', api_root, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('inventory.urls')),
]
