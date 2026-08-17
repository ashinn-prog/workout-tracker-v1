import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function WorkoutList({ refreshTrigger }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkouts = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/workouts/", {
        headers: { Authorization: `Token ${token}` },
      });
      setWorkouts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch workouts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts, refreshTrigger]);

  if (loading) return <p style={{ color: "#64748b" }}>Loading workouts...</p>;
  if (error) return <div className="status-msg error">{error}</div>;

  return (
    <div>
      <h3>Saved Workouts</h3>
      {workouts.length === 0 ? (
        <p style={{ color: "#64748b" }}>No workouts recorded yet.</p>
      ) : (
        workouts.map((session) => (
          <div key={session.id} className="workout-card">
            <strong>Date: {session.date}</strong>
            <ul>
              {session.exercises.map((ex) => (
                <li key={ex.id}>
                  <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps @ {ex.weight} kg/lbs
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default WorkoutList;