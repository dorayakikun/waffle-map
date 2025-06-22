import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppContainer } from "./pages";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(
  <ChakraProvider>
    <AppContainer />
  </ChakraProvider>
);
