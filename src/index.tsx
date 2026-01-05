import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { initializationPromise, getInitializationError } from "./domain/calculateMesh";
import { AppContainer } from "./pages";
import { useMeshcodesInputStore } from "./stores/useMeshcodesInputStore";
import { parseMeshcodesFromUrl } from "./utils/meshcodeUrl";
import type { Separator } from "./types";

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

  // Handle GitHub Pages SPA redirect
  const redirectPath = sessionStorage.getItem("redirect");
  if (redirectPath) {
    sessionStorage.removeItem("redirect");
    window.history.replaceState(null, "", redirectPath);
  }

  // Parse meshcodes from URL and initialize store
  const { meshcodes, separator } = parseMeshcodesFromUrl(
    window.location.pathname,
  );
  if (meshcodes.length > 0) {
    useMeshcodesInputStore.getState().setMeshcodesFromUrl(meshcodes, separator as Separator);
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <ChakraProvider value={system}>
      <ErrorBoundary>
        <AppContainer />
      </ErrorBoundary>
    </ChakraProvider>,
  );
}

initializeApp();
