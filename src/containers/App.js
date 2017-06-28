// @flow

import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import MeshContainer from './MeshContainer'
import MapContainer from './MapContainer'

const App = () =>
  <div>
    <Header as="h1" color="teal" block>
      Waffle Map
    </Header>
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={4}>
          <MeshContainer />
        </Grid.Column>
        <Grid.Column width={12}>
          <MapContainer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default App
