import { Field, Input, NativeSelect, Stack } from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  errorMessage: string;
  id: string;
  meshCodes: string;
  separator: string;
  onMeshecodesStringChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeparatorChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function MeshcodesInput(props: Props): React.ReactElement<Props> {
  const placeholder = React.useCallback(() => {
    return ["5339-35-97", "5339-35-98", "5339-35-99"].join(props.separator);
  }, [props.separator]);

  return (
    <Field.Root id={props.id} invalid={props.errorMessage !== ""}>
      <Stack gap={3}>
        <Input
          placeholder={placeholder()}
          onChange={props.onMeshecodesStringChanged}
          value={props.meshCodes}
        />
        <Field.ErrorText>{props.errorMessage}</Field.ErrorText>
        <NativeSelect.Root>
          <NativeSelect.Field onChange={props.onSeparatorChanged} value={props.separator}>
            <option value={","}>commas</option>
            <option value={"."}>dots</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Stack>
    </Field.Root>
  );
}
