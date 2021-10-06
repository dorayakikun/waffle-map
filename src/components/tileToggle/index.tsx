import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useTileToggleStateContext } from "./TileToggleStateContext";
import { useTileToggleDispatchContext } from "./TileToggleDispatchContext";

type Props = {
  id: string;
};

export const TileToggleContainer = (props: Props) => {
  const { enableTileGrid } = useTileToggleStateContext();
  const { setEnableTileGrid } = useTileToggleDispatchContext();

  const handleToggleChanged = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEnableTileGrid((e.target as any).value);
    },
    [setEnableTileGrid]
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
