import { createContext, useContext } from "react";

type State = {
  setEnableTileGrid: (enableTileGrid: boolean) => void;
};

export const TileToggleDispatchContext = createContext<State | Record<never, never>>({});
export const useTileToggleDispatchContext = () => {
  return useContext(TileToggleDispatchContext) as State;
};
