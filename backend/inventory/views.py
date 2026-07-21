from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Vehicle
from .serializers import RegisterSerializer, UserSerializer, VehicleSerializer
from .permissions import IsAdminUserOnly

class RegisterView(APIView):
    """
    API View to handle new user registration.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    API View to authenticate users and return JWT access/refresh tokens alongside user metadata.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'detail': 'Both username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)
        if user is None:
            return Response(
                {'detail': 'Invalid username or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    """
    Protected API View returning details of the currently authenticated user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


class VehicleListCreateView(APIView):
    """
    API View to list all available vehicles (Authenticated) or create a new vehicle (Admin only).
    """
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated(), IsAdminUserOnly()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        """Fetch all vehicles ordered by latest creation date."""
        vehicles = Vehicle.objects.all().order_by('-created_at')
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Add a new vehicle to the dealership inventory."""
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VehicleSearchView(APIView):
    """
    API View to search vehicles with multi-filtering parameters.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        queryset = Vehicle.objects.all().order_by('-created_at')

        make = request.query_params.get('make', '').strip()
        if make:
            queryset = queryset.filter(make__icontains=make)

        model = request.query_params.get('model', '').strip()
        if model:
            queryset = queryset.filter(model__icontains=model)

        category = request.query_params.get('category', '').strip()
        if category:
            queryset = queryset.filter(category__icontains=category)

        min_price = request.query_params.get('min_price')
        if min_price is not None and min_price != '':
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass

        max_price = request.query_params.get('max_price')
        if max_price is not None and max_price != '':
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass

        serializer = VehicleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VehicleDetailView(APIView):
    """
    API View to retrieve, update, or delete a single vehicle instance by ID.
    """
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated(), IsAdminUserOnly()]
        return [permissions.IsAuthenticated()]

    def get_object(self, pk: int) -> Vehicle | None:
        """Safely fetch a vehicle instance by primary key."""
        return Vehicle.objects.filter(pk=pk).first()

    def get(self, request, pk: int):
        """Retrieve details of a single vehicle."""
        vehicle = self.get_object(pk)
        if not vehicle:
            return Response({'detail': 'Vehicle not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(VehicleSerializer(vehicle).data, status=status.HTTP_200_OK)

    def put(self, request, pk: int):
        """Update vehicle details (Admin only)."""
        vehicle = self.get_object(pk)
        if not vehicle:
            return Response({'detail': 'Vehicle not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = VehicleSerializer(vehicle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk: int):
        """Delete a vehicle from inventory (Admin only)."""
        vehicle = self.get_object(pk)
        if not vehicle:
            return Response({'detail': 'Vehicle not found.'}, status=status.HTTP_404_NOT_FOUND)
        vehicle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
