import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../common/MeshRectangle";
import * as React from "react";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";

export const UserInputMeshLayerContainer = () => {
  const { datum } = useGeodeticInputStore();
  const { meshcodes, userInputMeshes } = useMeshcodesInputStore();
  return (
    <>
      {meshcodes.map((meshcode, index) => {
        const mesh = userInputMeshes[meshcode];
        const bounds = convertBoundsToWGS84IfNeeded(mesh.bounds, datum);
        return (
          <MeshRectangle
            key={`user_input_mesh_${mesh.code}`}
            bounds={bounds}
            index={index}
            meshCode={mesh.code}
            color={"#00847e"}
          />
        );
      })}
    </>
  );
};
