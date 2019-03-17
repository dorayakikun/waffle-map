import * as React from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";

export type Props = {
  unit: string;
  datum: string;
  changeUnit: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void;
  onDatumChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void;
};
const units: DropdownItemProps[] = [
  {
    text: "millisec",
    value: "millisec"
  },
  {
    text: "degree",
    value: "degree"
  }
];
const datums: DropdownItemProps[] = [
  {
    text: "Tokyo",
    value: "Tokyo"
  },
  {
    text: "WGS84",
    value: "WGS84"
  }
];

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <>
      <Dropdown
        fluid
        onChange={props.changeUnit}
        options={units}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        text={props.unit}
        value={props.unit}
      />
      <Dropdown
        fluid
        onChange={props.onDatumChanged}
        options={datums}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        text={props.datum}
        value={props.datum}
      />
    </>
  );
}
