import * as React from "react";
import { useMeshToggleStore } from "../../stores/useMeshToggleStore";
import { GridToggle } from "../common/GridToggle";

type Props = {
  id: string;
};

export const MeshToggleContainer = (props: Props) => {
  const { enableMeshGrid, setEnableMeshGrid } = useMeshToggleStore();

  const handleToggleChanged = React.useCallback(
    (details: { checked: boolean }) => {
      setEnableMeshGrid(details.checked);
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
