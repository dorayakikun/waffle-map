import "leaflet/dist/leaflet.css";
import "./index.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContainer } from "./pages";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/:meshCodes" element={<AppContainer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
