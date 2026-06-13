import React from "react";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      {message && <p style={{ marginTop: "1rem", fontWeight: "700", color: "var(--muted)" }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
