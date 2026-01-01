import * as React from "react";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import { MeshcodesInput } from "./MeshcodesInput";

type Props = {
  id: string;
};

export const MeshcodesInputContainer = (props: Props) => {
  const { meshcodesString, errorMessage, separator, inputMeshcodesString, changeSeparator } =
    useMeshcodesInputStore();

  const handleMeshcodesStringChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputMeshcodesString(e.target.value);
    },
    [inputMeshcodesString],
  );

  const handleSeparateChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeSeparator(e.target.value);
    },
    [changeSeparator],
  );

  return (
    <MeshcodesInput
      errorMessage={errorMessage}
      id={props.id}
      meshCodes={meshcodesString}
      separator={separator}
      onMeshecodesStringChanged={handleMeshcodesStringChanged}
      onSeparatorChanged={handleSeparateChanged}
    />
  );
};
