import React from "react";
import ReactDOM from "react-dom/client";

// Components
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

// Resources
import './index.css';
import './fonts/Glass_TTY_VT220.ttf';
import './fonts/Orden_Regular.woff2';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
