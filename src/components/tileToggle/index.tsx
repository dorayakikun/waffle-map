import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useTileToggleStore } from "../../stores/useTileToggleStore";

type Props = {
  id: string;
};

export const TileToggleContainer = (props: Props) => {
  const { enableTileGrid, setEnableTileGrid } = useTileToggleStore();

  const handleToggleChanged = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEnableTileGrid((e.target as any).checked);
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
