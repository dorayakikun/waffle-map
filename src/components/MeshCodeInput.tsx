import {
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  errorMessage: string;
  meshCodes: string;
  separator: string;
  onMeshesChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onSeparatorChanged: (e: React.SyntheticEvent<HTMLElement>) => void;
};

const separatorOptions = [
  {
    text: "commas",
    value: ",",
  },
  {
    text: "dots",
    value: ".",
  },
];

const fetchTextFrom = (
  options: { text: string; value: string }[],
  value: string
): string => {
  return options
    .filter((o) => o.value === value)
    .map((o) => o.text)
    .toString();
};

export function MeshCodeInput(props: Props): React.ReactElement<Props> {
  return (
    <FormControl isInvalid={props.errorMessage !== ""}>
      <Stack spacing={3}>
        <Input
          placeholder="5339-35-97.5339-35-98.5339-35-99"
          onChange={props.onMeshesChanged}
          value={props.meshCodes}
        />
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        <Select
          onChange={props.onSeparatorChanged}
          placeholder={`Split with ${fetchTextFrom(
            separatorOptions,
            props.separator
          )}`}
          value={props.separator}
        >
          <option value={","}>commas</option>
          <option value={"."}>dots</option>
        </Select>
      </Stack>
    </FormControl>
  );
}
