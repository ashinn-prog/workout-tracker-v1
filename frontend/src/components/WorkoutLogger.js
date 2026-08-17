import React, { useState } from "react";
import axios from "axios";

function WorkoutLogger({ onWorkoutAdded }) {
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleExerciseChange = (index, e) => {
    const updated = [...exercises];
    updated[index][e.target.name] = e.target.value;
    setExercises(updated);
  };

  const addExerciseRow = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExerciseRow = (index) => {
    if (exercises.length === 1) return;
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("userToken");
    if (!token) {
      setMessage("Please log in first.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    const payload = {
      exercises: exercises.map((ex) => ({
        name: ex.name,
        sets: parseInt(ex.sets, 10),
        reps: parseInt(ex.reps, 10),
        weight: parseFloat(ex.weight),
      })),
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/workouts/", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      setMessage("Workout saved successfully!");
      setIsSuccess(true);
      setExercises([{ name: "", sets: "", reps: "", weight: "" }]);
      if (onWorkoutAdded) onWorkoutAdded();
    } catch (err) {
      setMessage("Failed to save workout.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Log Workout Session</h2>
      {message && (
        <div className={`status-msg ${isSuccess ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {exercises.map((ex, index) => (
          <div key={index} className="exercise-row">
            <input
              type="text"
              name="name"
              placeholder="Exercise"
              value={ex.name}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="number"
              name="sets"
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="number"
              name="reps"
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="number"
              step="0.1"
              name="weight"
              placeholder="kg/lbs"
              value={ex.weight}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            {exercises.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeExerciseRow(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <button type="button" onClick={addExerciseRow}>
            + Add Exercise
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Session"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutLogger;