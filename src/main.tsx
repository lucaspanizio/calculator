import React from "react";
import ReactDOM from "react-dom/client";
import { Calculator } from "./components/Calculator/index.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
