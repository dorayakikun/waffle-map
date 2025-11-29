import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useMeshToggleStore } from "../../stores/useMeshToggleStore";

type Props = {
  id: string;
};

export const MeshToggleContainer = (props: Props) => {
  const { enableMeshGrid, setEnableMeshGrid } = useMeshToggleStore();

  const handleToggleChanged = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEnableMeshGrid((e.target as any).checked);
    },
    [setEnableMeshGrid],
  );

  return (
    <GridToggle
      id={props.id}
      enableGrid={enableMeshGrid}
      handleChanged={handleToggleChanged}
      title={"Show meshes"}
    />
  );
};
