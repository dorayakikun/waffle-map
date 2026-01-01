import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { initializationPromise, getInitializationError } from "./domain/calculateMesh";
import { AppContainer } from "./pages";

/**
 * Initialize the app after mesh calculator is ready.
 * This ensures all components can safely use meshCalculator methods.
 */
async function initializeApp(): Promise<void> {
  const success = await initializationPromise;

  if (!success) {
    const error = getInitializationError();
    console.error("[App] Mesh calculator failed to initialize:", error);
    // Continue rendering - ErrorBoundary will catch any issues
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <ChakraProvider value={defaultSystem}>
      <ErrorBoundary>
        <AppContainer />
      </ErrorBoundary>
    </ChakraProvider>,
  );
}

initializeApp();
