import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import "leaflet/dist/leaflet.css";
import "./styles/app.css";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { getInitializationError, initializationPromise } from "./domain/calculateMesh";
import { AppContainer } from "./pages";
import { useMeshcodesInputStore } from "./stores/useMeshcodesInputStore";
import { parseMeshcodesFromUrl } from "./utils/meshcodeUrl";

async function initializeApp(): Promise<void> {
  const success = await initializationPromise;

  if (!success) {
    const error = getInitializationError();
    console.error("[App] Mesh calculator failed to initialize:", error);
  }

  const { meshcodes, separator } = parseMeshcodesFromUrl(window.location.pathname);
  if (meshcodes.length > 0) {
    useMeshcodesInputStore.getState().setMeshcodesFromUrl(meshcodes, separator);
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
