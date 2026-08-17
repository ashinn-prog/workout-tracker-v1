import React, { useState } from "react";
import API_BASE_URL from "../api";

const WorkoutLogger = ({ onWorkoutAdded }) => {
  const [workout, setWorkout] = useState({ name: "", sets: "", reps: "", weight: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${API_BASE_URL}/api/workouts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(workout),
      });

      if (response.ok) {
        setMessage("Workout logged successfully!");
        setWorkout({ name: "", sets: "", reps: "", weight: "" });
        if (onWorkoutAdded) onWorkoutAdded();
      } else {
        setMessage("Failed to log workout.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div>
      <h3>Log Workout</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Exercise Name"
          value={workout.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={workout.sets}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={workout.reps}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg/lbs)"
          value={workout.weight}
          onChange={handleChange}
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutLogger;