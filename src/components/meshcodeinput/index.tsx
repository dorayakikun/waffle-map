import { MeshcodesInput } from "./MeshcodesInput";
import { 
  useMeshcodesInputErrorMessage,
  useMeshcodesInputMeshcodesString,
  useMeshcodesInputSeparator,
  useMeshcodesInputInputMeshcodesString,
  useMeshcodesInputChangeSeparator
} from "../../stores/meshcodesInputStore";
import { Separator } from "../../types";

type Props = {
  id: string;
};

export const MeshcodesInputContainer = (props: Props) => {
  const errorMessage = useMeshcodesInputErrorMessage();
  const meshcodesString = useMeshcodesInputMeshcodesString();
  const separator = useMeshcodesInputSeparator();
  const inputMeshcodesString = useMeshcodesInputInputMeshcodesString();
  const changeSeparator = useMeshcodesInputChangeSeparator();

  const handleMeshcodesStringChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    inputMeshcodesString((e.target as any).value);
  };

  const handleSeparateChanged = (value: string) => {
    changeSeparator(value as Separator);
  };

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
