from django.db import models
from django.contrib.auth.models import User

class WorkoutSession(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workout_sessions")
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Session on {self.date} by {self.owner.username}"

class Exercise(models.Model):
    session = models.ForeignKey(WorkoutSession, on_delete=models.CASCADE, related_name="exercises")
    name = models.CharField(max_length=100)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.sets}x{self.reps})"