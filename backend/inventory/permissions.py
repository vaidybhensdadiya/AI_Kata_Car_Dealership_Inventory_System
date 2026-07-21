from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin/staff users to edit/create objects.
    Read-only requests are allowed for authenticated or anonymous users depending on policy.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsAdminUserOnly(permissions.BasePermission):
    """
    Allows access only to authenticated admin/staff users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
