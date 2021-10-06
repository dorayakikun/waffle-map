import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import * as React from "react";
import { LatLng } from "../../../domain/calculateMesh";
import { round } from "../../../domain/roundPoint";

export type Props = {
  code: string;
  rows: { latLng: LatLng; title: string }[];
};

export function MeshDetail(props: Props): React.ReactElement<Props> {
  return (
    <Table>
      <Tbody>
        <Tr>
          <Td>mesh code</Td>
          <Td>{props.code}</Td>
        </Tr>
        {props.rows.map((row) => (
          <Tr key={`${props.code}-${row.title}`}>
            <Td>{row.title}</Td>
            <Td>
              {round(row.latLng.lat, 5)}
              <br />
              {round(row.latLng.lng, 5)}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
