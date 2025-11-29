import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "./pages";

import { HelmetProvider } from "react-helmet-async";

const root = document.getElementById("root");
render(
  <HelmetProvider>
    <ChakraProvider>
      <AppContainer />
    </ChakraProvider>
  </HelmetProvider>,
  root,
);
