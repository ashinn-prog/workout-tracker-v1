import React, { useEffect, useState } from "react";
import API_BASE_URL from "../api";

const WorkoutList = ({ refreshTrigger }) => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("userToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          setError("Failed to fetch workouts.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      }
    };

    fetchWorkouts();
  }, [refreshTrigger]);

  return (
    <div>
      <h3>Your Logged Workouts</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {workouts.length === 0 ? (
        <p>No workouts recorded yet.</p>
      ) : (
        <ul>
          {workouts.map((item) => (
            <li key={item.id || item.name}>
              <strong>{item.name}</strong>: {item.sets} sets × {item.reps} reps ({item.weight || 0} lbs/kg)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;