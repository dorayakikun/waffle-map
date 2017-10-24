// @flow

import React from 'react'
import { Accordion, Grid, Image, Menu, Radio, Sidebar } from 'semantic-ui-react'

import MarkerInputContainer from './MarkerInputContainer'
import MeshInputContainer from './MeshInputContainer'
import MeshDetailsContainer from './MeshDetailsContainer'
import MapContainer from './MapContainer'
import TileToggleContainer from './TileToggleContainer'

const App = () => (
  <div style={{ height: '100%' }}>
    <Sidebar.Pushable>
      <Sidebar inverted visible width="wide">
        <Accordion as={Menu} fluid inverted vertical>
          <Menu.Item name="waffleMap">
            <Image src="./images/logo.png" size="mini" spaced />
            <strong>Waffle Map</strong>
          </Menu.Item>

          <Accordion.Title index={0}>
            Tile Grid
          </Accordion.Title>
          <Accordion.Content>
            <Menu.Item name="tileToggle">
              <TileToggleContainer />
            </Menu.Item>
          </Accordion.Content>

          <Menu.Item name="meshInput">
            <MarkerInputContainer />
          </Menu.Item>
          <Menu.Item name="meshInput">
            <MeshInputContainer />
          </Menu.Item>
          <Menu.Item name="meshDetails">
            <MeshDetailsContainer />
          </Menu.Item>
        </Accordion>
      </Sidebar>
      <Sidebar.Pusher>
        <MapContainer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
)

export default App
