import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import WorkoutLogger from "./components/WorkoutLogger";
import WorkoutList from "./components/WorkoutList";
import WorkoutGuide from "./components/WorkoutGuide";

function App() {
  const [token, setToken] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  const handleWorkoutAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard-grid">
      {/* Main Glass Logger App Container */}
      <div className="glass-panel">
        {!token ? (
          <div>
            {isRegistering ? (
              <Register />
            ) : (
              <Login onLoginSuccess={(newToken) => setToken(newToken)} />
            )}
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering
                  ? "Already have an account? Log In"
                  : "Need an account? Register here"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                }}
              >
                ⚡ GYM LOGGER
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
            <WorkoutLogger onWorkoutAdded={handleWorkoutAdded} />
            <hr />
            <WorkoutList refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>

      {/* Side Guide Panel with Popups */}
      <WorkoutGuide />
    </div>
  );
}

export default App;