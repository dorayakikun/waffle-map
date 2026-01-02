
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../common/MeshRectangle";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";

export const UserInputMeshLayerContainer = () => {
  const datum = useGeodeticInputStore((state) => state.datum);
  const { meshcodes, userInputMeshes } = useMeshcodesInputStore();
  return (
    <>
      {meshcodes.map((meshcode, index) => {
        const mesh = userInputMeshes[meshcode];
        if (!mesh) {
          return null;
        }
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
