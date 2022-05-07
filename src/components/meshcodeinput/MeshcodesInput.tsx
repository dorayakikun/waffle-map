import { FormControl, FormErrorMessage, Input, Select, Stack } from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  errorMessage: string;
  id: string;
  meshCodes: string;
  separator: string;
  onMeshecodesStringChanged: (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => void;
  onSeparatorChanged: (e: React.SyntheticEvent<HTMLElement>) => void;
};

export function MeshcodesInput(props: Props): React.ReactElement<Props> {
  const placeholder = React.useCallback(() => {
    return ["5339-35-97", "5339-35-98", "5339-35-99"].join(props.separator);
  }, [props.separator]);

  return (
    <FormControl id={props.id} isInvalid={props.errorMessage !== ""}>
      <Stack spacing={3}>
        <Input
          placeholder={placeholder()}
          onChange={props.onMeshecodesStringChanged}
          value={props.meshCodes}
        />
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        <Select onChange={props.onSeparatorChanged} value={props.separator}>
          <option value={","}>commas</option>
          <option value={"."}>dots</option>
        </Select>
      </Stack>
    </FormControl>
  );
}
