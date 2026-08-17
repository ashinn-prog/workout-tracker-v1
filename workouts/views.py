from rest_framework import viewsets, permissions
from .models import WorkoutSession
from .serializers import WorkoutSessionSerializer

class WorkoutSessionViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict data so users only see their own workouts
        return WorkoutSession.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Automatically attach the logged-in user as owner
        serializer.save(owner=self.request.user)