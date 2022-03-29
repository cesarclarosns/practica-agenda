from rest_framework import permissions


class IsContactOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.user == request.user:
            return True
        return False
    
 