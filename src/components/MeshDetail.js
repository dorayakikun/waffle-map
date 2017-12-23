// @flow

import React from 'react';
import { Table } from 'semantic-ui-react';
import { round } from '../domain/roundPoint';

import type { Bounds, LatLng } from '../domain/calculateMesh';

export type Props = {
  code: string,
  center: LatLng,
  bounds: Bounds
}

type TableRowValue = {
  latLng: LatLng,
  title: string
}

const mapPropsToTableRowValues = (props: Props): Array<TableRowValue> => [
  { latLng: props.center, title: 'center' },
  { latLng: props.bounds.leftTop, title: 'leftTop' },
  { latLng: props.bounds.rightBottom, title: 'rightBottom' },
];

const MeshDetail = (props: Props) => (
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

export default MeshDetail;
