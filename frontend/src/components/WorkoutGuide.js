import React, { useState } from "react";

const EXERCISE_GUIDE = [
  {
    id: "bench",
    name: "Bench Press",
    muscles: "Pectoralis Major, Anterior Deltoids, Triceps",
    growthMechanism: "Mechanical tension via heavy compound pressing stimulus.",
    tip: "Keep shoulder blades retracted and maintain a stable arc path.",
  },
  {
    id: "squat",
    name: "Barbell Back Squat",
    muscles: "Quadriceps, Gluteus Maximus, Core Stabilizers",
    growthMechanism: "High structural load promoting systemic hypertrophy.",
    tip: "Break at knees and hips simultaneously while keeping chest up.",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    muscles: "Erector Spinae, Hamstrings, Latissimus Dorsi",
    growthMechanism: "Maximum axial loading across the entire posterior chain.",
    tip: "Engage lats before lifting to protect lumbar spine stability.",
  },
];

function WorkoutGuide() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="glass-panel">
      <h3>💡 Exercise & Muscle Guide</h3>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
        Click any exercise below to open the hypertrophy & targeting preview.
      </p>

      {EXERCISE_GUIDE.map((item) => (
        <div key={item.id} className="side-card" onClick={() => setSelectedExercise(item)}>
          <strong style={{ display: "block", fontSize: "0.95rem" }}>{item.name}</strong>
          <span className="tag">Target: {item.muscles.split(",")[0]}</span>
        </div>
      ))}

      {/* Popup Modal */}
      {selectedExercise && (
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedExercise(null)}>✕</button>
            <h2>{selectedExercise.name}</h2>
            
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#38bdf8", fontSize: "0.85rem" }}>TARGET MUSCLES</strong>
              <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>{selectedExercise.muscles}</p>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#86efac", fontSize: "0.85rem" }}>MUSCLE GROWTH MECHANISM</strong>
              <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>{selectedExercise.growthMechanism}</p>
            </div>

            <div>
              <strong style={{ color: "#fca5a5", fontSize: "0.85rem" }}>FORM TIP</strong>
              <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>{selectedExercise.tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutGuide;