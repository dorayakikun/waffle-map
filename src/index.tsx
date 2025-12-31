import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppContainer } from "./pages";

const root = document.getElementById("root")!;
createRoot(root).render(
  <ChakraProvider value={defaultSystem}>
    <AppContainer />
  </ChakraProvider>,
);
