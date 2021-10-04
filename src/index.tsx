import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { CoordPopupLayerProvider } from "./components/coordpopup/CoordPopupLayerProvider";
import { GeodeticInputProvider } from "./components/geodeticInput/GeodeticInputProvider";
import { MeshcodesInputProvider } from "./components/meshcodeinput/MeshcodesInputProvider";
import { MeshToggleProvider } from "./components/meshtoggle/MeshToggleProvider";
import { MarkerInputProvider } from "./components/markerinput/MarkerInputProvider";
import { AppContainer } from "./containers/App";
import { reducers } from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducers, enhancer);
sagaMiddleware.run(rootSaga);

const root = document.getElementById("root");
render(
  <Provider store={store}>
    <ChakraProvider>
      <CoordPopupLayerProvider>
        <GeodeticInputProvider>
          <MeshToggleProvider>
            <MarkerInputProvider>
              <MeshcodesInputProvider>
                <AppContainer />
              </MeshcodesInputProvider>
            </MarkerInputProvider>
          </MeshToggleProvider>
        </GeodeticInputProvider>
      </CoordPopupLayerProvider>
    </ChakraProvider>
  </Provider>,
  root
);
