import { MarkerLayer } from "./MarkerLayer";
import { useGeodeticInputDatum } from "../../stores/geodeticInputStore";
import { useMarkerInputPositions } from "../../stores/markerInputStore";

export const MarkerlayerContainer = () => {
  const datum = useGeodeticInputDatum();
  const positions = useMarkerInputPositions();
  return <MarkerLayer datum={datum} positions={positions} />;
};
