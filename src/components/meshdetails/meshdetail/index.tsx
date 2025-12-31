import { Table } from "@chakra-ui/react";
import type * as React from "react";
import type { LatLng } from "../../../domain/calculateMesh";
import { round } from "../../../domain/roundPoint";

export type Props = {
  code: string;
  rows: { latLng: LatLng; title: string }[];
};

export function MeshDetail(props: Props): React.ReactElement<Props> {
  return (
    <Table.Root>
      <Table.Body>
        <Table.Row>
          <Table.Cell>mesh code</Table.Cell>
          <Table.Cell>{props.code}</Table.Cell>
        </Table.Row>
        {props.rows.map((row) => (
          <Table.Row key={`${props.code}-${row.title}`}>
            <Table.Cell>{row.title}</Table.Cell>
            <Table.Cell>
              {round(row.latLng.lat, 5)}
              <br />
              {round(row.latLng.lng, 5)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
