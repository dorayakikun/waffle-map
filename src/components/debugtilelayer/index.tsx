import * as React from "react";
import { useTileToggleStore } from "../../stores/useTileToggleStore";
import { DebugTileLayer } from "./DebugTileLayer";

export const DebugtilelayerContainer = () => {
  const enableTileGrid = useTileToggleStore((state) => state.enableTileGrid);
  return !enableTileGrid ? null : <DebugTileLayer />;
};
