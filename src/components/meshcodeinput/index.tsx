import * as React from "react";
import { useDebouncedCallback } from "../../hooks";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import type { Separator } from "../../types";
import { MeshcodesInput } from "./MeshcodesInput";

const INPUT_DEBOUNCE_MS = 150;

type Props = {
  id: string;
};

export const MeshcodesInputContainer = React.memo(function MeshcodesInputContainer({ id }: Props) {
  const meshcodesString = useMeshcodesInputStore((state) => state.meshcodesString);
  const errorMessage = useMeshcodesInputStore((state) => state.errorMessage);
  const separator = useMeshcodesInputStore((state) => state.separator);
  const inputMeshcodesString = useMeshcodesInputStore((state) => state.inputMeshcodesString);
  const changeSeparator = useMeshcodesInputStore((state) => state.changeSeparator);

  const [localInput, setLocalInput] = React.useState(meshcodesString);

  React.useEffect(() => {
    setLocalInput(meshcodesString);
  }, [meshcodesString]);

  const debouncedInputMeshcodesString = useDebouncedCallback(
    inputMeshcodesString,
    INPUT_DEBOUNCE_MS,
  );

  const handleMeshcodesStringChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalInput(value);
      debouncedInputMeshcodesString(value);
    },
    [debouncedInputMeshcodesString],
  );

  const handleSeparatorChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeSeparator(e.target.value as Separator);
    },
    [changeSeparator],
  );

  return (
    <MeshcodesInput
      errorMessage={errorMessage}
      id={id}
      meshCodes={localInput}
      separator={separator}
      onMeshecodesStringChanged={handleMeshcodesStringChanged}
      onSeparatorChanged={handleSeparatorChanged}
    />
  );
});
