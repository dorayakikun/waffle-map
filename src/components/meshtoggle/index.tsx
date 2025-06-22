import * as React from "react";
import { GridToggle } from "../common/GridToggle";
import { useMeshToggleActions, useMeshToggleState } from "../../stores/meshToggleStore";

type Props = {
  id: string;
};

export const MeshToggleContainer = (props: Props) => {
  const { enableMeshGrid } = useMeshToggleState();
  const { setEnableMeshGrid } = useMeshToggleActions();

  const handleToggleChanged = React.useCallback(
    (checked: boolean) => {
      setEnableMeshGrid(checked);
    },
    [setEnableMeshGrid],
  );

  return (
    <GridToggle
      id={props.id}
      enableGrid={enableMeshGrid}
      handleChanged={handleToggleChanged}
      title="Show meshes"
    />
  );
};
