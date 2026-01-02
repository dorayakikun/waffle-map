import { NativeSelect, Stack } from "@chakra-ui/react";
import type * as React from "react";
export type Props = {
  unit: string;
  datum: string;
  onUnitChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDatumChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <Stack gap={2}>
      <NativeSelect.Root size="md">
        <NativeSelect.Field onChange={props.onUnitChanged} value={props.unit}>
          <option value={"millisec"}>millisec</option>
          <option value={"degree"}>degree</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
      <NativeSelect.Root size="md">
        <NativeSelect.Field onChange={props.onDatumChanged} value={props.datum}>
          <option value={"Tokyo"}>Tokyo</option>
          <option value={"WGS84"}>WGS84</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Stack>
  );
}
