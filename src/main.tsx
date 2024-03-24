import React from "react";
import ReactDOM from "react-dom/client";
import { Calculator } from "@/components/Calculator/index.tsx";
import { AppProvider } from "@/store/hooks/useApp.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <Calculator />
    </AppProvider>
  </React.StrictMode>
);
