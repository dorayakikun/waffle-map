import * as React from "react";
import { Table } from "semantic-ui-react";
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
      <Table.Body>
        <Table.Row>
          <Table.Cell>mesh code</Table.Cell>
          <Table.Cell>{props.code}</Table.Cell>
        </Table.Row>
        {mapPropsToTableRowValues(props).map(
          (value: TableRowValue, key: number) => (
            <Table.Row key={key}>
              <Table.Cell>{value.title}</Table.Cell>
              <Table.Cell>
                {round(value.latLng.lat, 5)}
                <br />
                {round(value.latLng.lng, 5)}
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}
