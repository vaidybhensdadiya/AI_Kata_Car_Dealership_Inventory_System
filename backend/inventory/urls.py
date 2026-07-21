from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserProfileView,
    VehicleListCreateView,
    VehicleSearchView,
    VehicleDetailView,
    PurchaseVehicleView,
    RestockVehicleView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/me/', UserProfileView.as_view(), name='user_profile'),
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle_list_create'),
    path('vehicles/search/', VehicleSearchView.as_view(), name='vehicle_search'),
    path('vehicles/<int:pk>/', VehicleDetailView.as_view(), name='vehicle_detail'),
    path('vehicles/<int:pk>/purchase/', PurchaseVehicleView.as_view(), name='vehicle_purchase'),
    path('vehicles/<int:pk>/restock/', RestockVehicleView.as_view(), name='vehicle_restock'),
]
