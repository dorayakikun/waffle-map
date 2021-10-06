import * as React from "react";
import { DebugTileLayer } from "./DebugTileLayer";
import { useTileToggleStateContext } from "../tileToggle/TileToggleStateContext";

export const DebugtilelayerContainer = () => {
  const { enableTileGrid } = useTileToggleStateContext();
  return !enableTileGrid ? null : <DebugTileLayer />;
};
