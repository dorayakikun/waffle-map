import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../common/MeshRectangle";
import * as React from "react";
import { useMeshCodeInputStateContext } from "../meshcodeinput/MeshcodesInputStateContext";
import { useGeodeticInputStateContext } from "../geodeticInput/GeodeticInputStateContext";

export const UserInputMeshLayerContainer = () => {
  const { datum } = useGeodeticInputStateContext();
  const { meshcodes, userInputMeshes } = useMeshCodeInputStateContext();
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
}