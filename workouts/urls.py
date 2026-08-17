from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, WorkoutSessionViewSet

router = DefaultRouter()
router.register(r'workouts', WorkoutSessionViewSet, basename='workoutsession')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('', include(router.urls)),
]