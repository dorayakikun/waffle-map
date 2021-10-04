import * as React from "react";
import { GridToggle } from "../common/GridToggle";

export const TileToggleContainer = () => {
  // FIXME
  const id = "";
  const isShowTileGrid = false;
  const handleToggleChanged = React.useCallback(() => {}, []);
  return (
    <GridToggle
      id={id}
      enableGrid={isShowTileGrid}
      onToggleChanged={handleToggleChanged}
      title={"Show tiles"}
    />
  );
};
