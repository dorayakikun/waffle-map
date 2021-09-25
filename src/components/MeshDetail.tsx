import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import * as React from "react";
import { Bounds, LatLng } from "../domain/calculateMesh";
import { round } from "../domain/roundPoint";

export type Props = {
  code: string;
  center: LatLng;
  bounds: Bounds;
};

type TableRowValue = {
  latLng: LatLng;
  title: string;
};

const mapPropsToTableRowValues = ({
  center,
  bounds,
}: Props): TableRowValue[] => [
  { latLng: center, title: "center" },
  { latLng: bounds.leftTop, title: "leftTop" },
  { latLng: bounds.rightBottom, title: "rightBottom" },
];

export function MeshDetail(props: Props): React.ReactElement<Props> {
  return (
    <Table inverted>
      <Tbody>
        <Tr>
          <Td>mesh code</Td>
          <Td>{props.code}</Td>
        </Tr>
        {mapPropsToTableRowValues(props).map(
          (value: TableRowValue, key: number) => (
            <Tr key={key}>
              <Td>{value.title}</Td>
              <Td>
                {round(value.latLng.lat, 5)}
                <br />
                {round(value.latLng.lng, 5)}
              </Td>
            </Tr>
          )
        )}
      </Tbody>
    </Table>
  );
}
