import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "./pages";

const root = document.getElementById("root");
render(
  <ChakraProvider>
    <AppContainer />
  </ChakraProvider>,
  root,
);
