// @flow

import React from 'react'
import { Grid, Image, Menu, Radio, Sidebar } from 'semantic-ui-react'

import MarkerInputContainer from './MarkerInputContainer'
import MeshInputContainer from './MeshInputContainer'
import MeshDetailsContainer from './MeshDetailsContainer'
import MapContainer from './MapContainer'
import TileToggleContainer from './TileToggleContainer'

const App = () => (
  <div style={{ height: '100%' }}>
    <Sidebar.Pushable>
      <Sidebar as={Menu} inverted vertical visible width="wide">
        <Menu.Item name="waffleMap">
          <Image src="./images/logo.png" size="mini" spaced />
          <strong>Waffle Map</strong>
        </Menu.Item>
        <Menu.Item name="tileToggle">
          <TileToggleContainer />
        </Menu.Item>
        <Menu.Item name="meshInput">
          <MarkerInputContainer />
        </Menu.Item>
        <Menu.Item name="meshInput">
          <MeshInputContainer />
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
)

export default App
