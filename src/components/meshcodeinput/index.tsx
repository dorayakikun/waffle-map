import * as React from "react";
import { MeshcodesInput } from "./MeshcodesInput";
import { useMeshCodeInputDispatchContext } from "./MeshcodesInputDispatchContext";
import { useMeshCodeInputStateContext } from "./MeshcodesInputStateContext";

type Props = {
  id: string;
};

export const MeshcodesInputContainer = (props: Props) => {
  const { meshcodesString, errorMessage, separator } = useMeshCodeInputStateContext();
  const { inputMeshcodesString, changeSeparator } = useMeshCodeInputDispatchContext();

  const handleMeshcodesStringChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      inputMeshcodesString((e.target as any).value);
    },
    [inputMeshcodesString],
  );

  const handleSeparateChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      changeSeparator((e.target as any).value);
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
