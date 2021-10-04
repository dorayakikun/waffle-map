import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useMeshToggleDispatchContext } from "./MeshToggleDispatchContext";
import { useMeshToggleStateContext } from "./MeshToggleStateContext";

type Props = {
  id: string;
};

export const MeshToggleContainer = (props: Props) => {
  const { enableMeshGrid } = useMeshToggleStateContext();
  const { setEnableMeshGrid } = useMeshToggleDispatchContext();
  const handleToggleChanged = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEnableMeshGrid((e.target as any).value);
    },
    [setEnableMeshGrid]
  );
  return (
    <GridToggle
      id={props.id}
      enableGrid={enableMeshGrid}
      onToggleChanged={handleToggleChanged}
      title={"Show meshes"}
    />
  );
};
