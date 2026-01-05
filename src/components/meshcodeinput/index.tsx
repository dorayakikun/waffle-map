import * as React from "react";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import { useDebouncedCallback } from "../../hooks";
import { MeshcodesInput } from "./MeshcodesInput";
import type { Separator } from "../../types";

/**
 * Debounce delay for input changes in milliseconds.
 */
const INPUT_DEBOUNCE_MS = 150;

type Props = {
  id: string;
};

/**
 * Container component for mesh code input.
 * Handles state management and debouncing of user input.
 */
export const MeshcodesInputContainer = React.memo(function MeshcodesInputContainer({
  id,
}: Props) {
  const meshcodesString = useMeshcodesInputStore((state) => state.meshcodesString);
  const errorMessage = useMeshcodesInputStore((state) => state.errorMessage);
  const separator = useMeshcodesInputStore((state) => state.separator);
  const inputMeshcodesString = useMeshcodesInputStore((state) => state.inputMeshcodesString);
  const changeSeparator = useMeshcodesInputStore((state) => state.changeSeparator);

  // Local state for immediate input feedback
  const [localInput, setLocalInput] = React.useState(meshcodesString);

  // Sync local state when store changes (e.g., from URL)
  React.useEffect(() => {
    setLocalInput(meshcodesString);
  }, [meshcodesString]);

  // Debounced store update
  const debouncedInputMeshcodesString = useDebouncedCallback(
    inputMeshcodesString,
    INPUT_DEBOUNCE_MS,
  );

  const handleMeshcodesStringChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalInput(value); // Update immediately for responsive UI
      debouncedInputMeshcodesString(value); // Debounce store update
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
