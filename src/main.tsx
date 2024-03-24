import React from "react";
import ReactDOM from "react-dom/client";
import { Calculator } from "./components/Calculator/index.tsx";
import "./global.css";
import { AppProvider } from "./store/hooks/useApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <Calculator />
    </AppProvider>
  </React.StrictMode>
);
