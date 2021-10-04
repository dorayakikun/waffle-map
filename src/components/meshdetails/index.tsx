import * as React from "react";
import { useMeshCodeInputStateContext } from "../meshcodeinput/MeshcodesInputStateContext";
import { MeshDetail } from "./meshdetail/";
import { Bounds, LatLng } from "../../domain/calculateMesh";

const createRows = (center: LatLng, bounds: Bounds) => [
  { latLng: center, title: "center" },
  { latLng: bounds.leftTop, title: "leftTop" },
  { latLng: bounds.rightBottom, title: "rightBottom" },
];

export const MeshDetailsContainer = () => {
  const { meshcodes, userInputMeshes } = useMeshCodeInputStateContext();

  return (
    <>
      {meshcodes.map((meshcode) => {
        const mesh = userInputMeshes[meshcode];
        const rows = createRows(mesh.center, mesh.bounds);
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
