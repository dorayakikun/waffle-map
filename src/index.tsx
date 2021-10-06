import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { render } from "react-dom";
import { CoordPopupLayerProvider } from "./components/coordpopup/CoordPopupLayerProvider";
import { GeodeticInputProvider } from "./components/geodeticInput/GeodeticInputProvider";
import { MeshcodesInputProvider } from "./components/meshcodeinput/MeshcodesInputProvider";
import { MeshToggleProvider } from "./components/meshtoggle/MeshToggleProvider";
import { MarkerInputProvider } from "./components/markerinput/MarkerInputProvider";
import { TileToggleProvider } from "./components/tileToggle/TileToggleProvider";
import { AppContainer } from "./pages";

const root = document.getElementById("root");
render(
  <ChakraProvider>
    <CoordPopupLayerProvider>
      <GeodeticInputProvider>
        <MeshToggleProvider>
          <MarkerInputProvider>
            <MeshcodesInputProvider>
              <TileToggleProvider>
                <AppContainer />
              </TileToggleProvider>
            </MeshcodesInputProvider>
          </MarkerInputProvider>
        </MeshToggleProvider>
      </GeodeticInputProvider>
    </CoordPopupLayerProvider>
  </ChakraProvider>,
  root
);
