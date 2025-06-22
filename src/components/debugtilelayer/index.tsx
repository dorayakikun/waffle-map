import { DebugTileLayer } from "./DebugTileLayer";
import { useTileToggleEnableTileGrid } from "../../stores/tileToggleStore";

export const DebugtilelayerContainer = () => {
  const enableTileGrid = useTileToggleEnableTileGrid();
  return !enableTileGrid ? null : <DebugTileLayer />;
};
