from rest_framework import serializers
from .models import WorkoutSession, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']

class WorkoutSessionSerializer(serializers.ModelSerializer):
    # This allows a single request to accept a nested list of exercises
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = WorkoutSession
        fields = ['id', 'date', 'owner', 'exercises']
        read_only_fields = ['owner']

    # Custom create method to save session and all nested exercises together
    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        session = WorkoutSession.objects.create(**validated_data)
        for exercise_data in exercises_data:
            Exercise.objects.create(session=session, **exercise_data)
        return session