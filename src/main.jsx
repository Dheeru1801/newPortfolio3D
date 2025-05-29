import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "./components/customStyles.css";
import "./components/VisibilityFix.css"; // Import visibility fix
import "./components/AnimationFix.css"; // Import animation fixes
import "./components/IntroductionAnimation.css"; // Import introduction animations

// Import card visibility system for fade effects
import { initCardVisibility } from "./utils/cardVisibility";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
);

// Initialize card visibility effects after the React app has loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    initCardVisibility();
  }, 1000); // Allow time for React to render everything
});
