from rest_framework import serializers
from .models import WorkoutSession, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']

class WorkoutSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = WorkoutSession
        fields = ['id', 'title', 'created_at', 'user', 'exercises']
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        session = WorkoutSession.objects.create(**validated_data)
        for exercise_data in exercises_data:
            Exercise.objects.create(workout_session=session, **exercise_data)
        return session