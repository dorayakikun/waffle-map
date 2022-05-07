import * as React from "react";
import { useMeshCodeInputStateContext } from "../meshcodeinput/MeshcodesInputStateContext";
import { MeshDetail } from "./meshdetail/";
import { Bounds, LatLng } from "../../domain/calculateMesh";
import {
  convertBoundsToMillisecIfNeeded,
  convertBoundsToTokyoIfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../../domain/convertLatLng";
import { useGeodeticInputStateContext } from "../geodeticInput/GeodeticInputStateContext";

const createRows = (center: LatLng, bounds: Bounds) => [
  { latLng: center, title: "center" },
  { latLng: bounds.leftTop, title: "leftTop" },
  { latLng: bounds.rightBottom, title: "rightBottom" },
];

export const MeshDetailsContainer = () => {
  const { datum, unit } = useGeodeticInputStateContext();
  const { meshcodes, userInputMeshes } = useMeshCodeInputStateContext();

  return (
    <>
      {meshcodes.map((meshcode) => {
        const mesh = userInputMeshes[meshcode];

        const center = convertLatLngToMillisecIfNeeded(
          convertLatLngToTokyoIfNeeded(mesh.center, datum),
          unit,
        );
        const bounds = convertBoundsToMillisecIfNeeded(
          convertBoundsToTokyoIfNeeded(mesh.bounds, datum),
          unit,
        );

        const rows = createRows(center, bounds);
        return (
          <MeshDetail
            key={`meshDetail-${mesh.code}`}
            code={mesh.code}
            rows={rows}
          />
        );
      })}
    </>
  );
};
