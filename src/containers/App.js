// @flow

import React from 'react'
import { Grid, Image, Menu, Sidebar } from 'semantic-ui-react'

import MeshContainer from './MeshContainer'
import MeshDetailsContainer from './MeshDetailsContainer'
import MapContainer from './MapContainer'

const App = () =>
  <div style={{ height: '100%' }}>
    <Sidebar.Pushable>
      <Sidebar as={Menu} inverted vertical visible width="wide">
        <Menu.Item name="waffleMap">
          <Image src="./logo.png" size="mini" spaced />
          <strong>Waffle Map</strong>
        </Menu.Item>
        <Menu.Item name="meshInput">
          <MeshContainer />
        </Menu.Item>
        <Menu.Item name="meshDetails">
          <MeshDetailsContainer />
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <MapContainer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>

export default App
