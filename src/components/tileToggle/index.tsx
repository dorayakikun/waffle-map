import * as React from "react";
import { useTileToggleStore } from "../../stores/useTileToggleStore";
import { GridToggle } from "../common/GridToggle";

type Props = {
  id: string;
};

export const TileToggleContainer = (props: Props) => {
  const { enableTileGrid, setEnableTileGrid } = useTileToggleStore();

  const handleToggleChanged = React.useCallback(
    (details: { checked: boolean }) => {
      setEnableTileGrid(details.checked);
    },
    [setEnableTileGrid],
  );

  return (
    <GridToggle
      id={props.id}
      enableGrid={enableTileGrid}
      handleChanged={handleToggleChanged}
      title={"Show tiles"}
    />
  );
};
