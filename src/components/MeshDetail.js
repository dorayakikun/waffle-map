// @flow

import React, { PropTypes } from 'react'
import { Table } from 'semantic-ui-react'

const MeshDetail = ({ code, center, bounds }: any) =>
  <Table inverted>
    <Table.Row>
      <Table.Cell>mesh</Table.Cell>
      <Table.Cell>{code}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>center</Table.Cell>
      <Table.Cell>
        {center.lat}<br />
        {center.lon}
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>leftTop</Table.Cell>
      <Table.Cell>{bounds[0][0]}<br />{bounds[0][1]}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>rightBottom</Table.Cell>
      <Table.Cell>{bounds[1][0]}<br />{bounds[1][1]}</Table.Cell>
    </Table.Row>
  </Table>

MeshDetail.PropTypes = {
  code: PropTypes.string.isRequired,
  center: PropTypes.array.isRequired,
  bounds: PropTypes.array.isRequired
}

export default MeshDetail
