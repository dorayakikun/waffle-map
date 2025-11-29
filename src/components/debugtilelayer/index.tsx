import * as React from "react";
import { DebugTileLayer } from "./DebugTileLayer";
import { useTileToggleStore } from "../../stores/useTileToggleStore";

export const DebugtilelayerContainer = () => {
  const { enableTileGrid } = useTileToggleStore();
  return !enableTileGrid ? null : <DebugTileLayer />;
};
