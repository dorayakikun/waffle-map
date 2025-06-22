import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useTileToggleState, useTileToggleActions } from "../../stores/tileToggleStore";

type Props = {
  id: string;
};

export const TileToggleContainer = (props: Props) => {
  const { enableTileGrid } = useTileToggleState();
  const { setEnableTileGrid } = useTileToggleActions();

  const handleToggleChanged = React.useCallback(
    (checked: boolean) => {
      setEnableTileGrid(checked);
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
