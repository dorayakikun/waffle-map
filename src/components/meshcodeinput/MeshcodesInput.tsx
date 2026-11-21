import { Box, Field, Input, NativeSelect, Stack, Text } from "@chakra-ui/react";
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
    <Field.Root invalid={props.errorMessage !== ""}>
      <Stack gap={2} w="full">
        <Input
          id={props.id}
          size="sm"
          rounded="lg"
          bg="bg.subtle"
          fontFamily="mono"
          fontSize="xs"
          placeholder={placeholder()}
          onChange={props.onMeshecodesStringChanged}
          value={props.meshCodes}
        />
        <Field.ErrorText fontSize="xs">{props.errorMessage}</Field.ErrorText>
        <Box>
          <Text fontSize="2xs" fontWeight="600" color="fg.muted" mb={1}>
            Separator
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              id="meshCodeSeparator"
              rounded="lg"
              bg="bg.subtle"
              borderColor="border"
              fontSize="xs"
              fontWeight="500"
              onChange={props.onSeparatorChanged}
              value={props.separator}
            >
              <option value=",">commas (,)</option>
              <option value=".">dots (.)</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
      </Stack>
    </Field.Root>
  );
}
