import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AppContainer } from "./pages";

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
