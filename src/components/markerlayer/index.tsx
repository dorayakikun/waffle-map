import * as React from "react";
import { MarkerLayer } from "./MarkerLayer";
import { useGeodeticInputStateContext } from "../geodeticInput/GeodeticInputStateContext";
import { useMarkerInputStateContext } from "../markerinput/MarkerInputStateContext";

export const MarkerlayerContainer = () => {
  const { datum } = useGeodeticInputStateContext();
  const { positions } = useMarkerInputStateContext();
  return <MarkerLayer datum={datum} positions={positions} />;
};
