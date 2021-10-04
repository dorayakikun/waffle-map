import { Select, Stack } from "@chakra-ui/react";
import * as React from "react";
export type Props = {
  unit: string;
  datum: string;
  onUnitChanged: (event: React.SyntheticEvent<HTMLElement>) => void;
  onDatumChanged: (event: React.SyntheticEvent<HTMLElement>) => void;
};

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <Stack spacing={3}>
      <Select onChange={props.onUnitChanged} size="md" value={props.unit}>
        <option value={"millisec"}>millisec</option>
        <option value={"degree"}>degree</option>
      </Select>
      <Select onChange={props.onDatumChanged} size="md" value={props.datum}>
        <option value={"Tokyo"}>Tokyo</option>
        <option value={"WGS84"}>WGS84</option>
      </Select>
    </Stack>
  );
}
