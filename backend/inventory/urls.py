from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, VehicleListCreateView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/me/', UserProfileView.as_view(), name='user_profile'),
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle_list_create'),
]
