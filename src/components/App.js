// @flow

import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import MeshInput from './MeshInput'
import Map from './Map'

const App = () =>
  <div>
    <Header as="h1" color="teal" block>
      Waffle Map
    </Header>
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={4}>
          <MeshInput />
        </Grid.Column>
        <Grid.Column width={12}>
          <Map />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default App
