// @flow

import React, { Component } from 'react'
import { Accordion, Grid, Image, Menu, Radio, Sidebar } from 'semantic-ui-react'

import MarkerInputContainer from './MarkerInputContainer'
import MeshInputContainer from './MeshInputContainer'
import MeshDetailsContainer from './MeshDetailsContainer'
import MapContainer from './MapContainer'
import TileToggleContainer from './TileToggleContainer'
import MeshToggleContainer from './MeshToggleContainer'

type Props = {
  activeIndex: number
}

type State = {
  activeIndex: number
}

export default class AccordionExampleMenu extends Component<Props, State> {
  state = { activeIndex: 2 }

  handleClick = (e: Event, titleProps: { index: number }) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div style={{ height: '100%' }}>
        <Sidebar.Pushable>
          <Sidebar visible width="wide">
            <Accordion
              as={Menu}
              fluid
              inverted
              vertical
              style={{ height: '100%' }}
            >
              <Menu.Item name="waffleMap">
                <Image src="./images/logo.png" size="mini" spaced />
                <strong>Waffle Map</strong>
              </Menu.Item>

              <Menu.Item name="tileToggle">
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
                >
                  Tile Grid
                </Accordion.Title>

                <Accordion.Content active={activeIndex === 0}>
                  <TileToggleContainer />
                </Accordion.Content>
              </Menu.Item>

              <Menu.Item name="gridToggle">
                <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.handleClick}
                >
                  Mesh Grid
                </Accordion.Title>

                <Accordion.Content active={activeIndex === 1}>
                  <MeshToggleContainer />
                </Accordion.Content>
              </Menu.Item>

              <Menu.Item name="markerInput">
                <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={this.handleClick}
                >
                  Marker
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <MarkerInputContainer />
                </Accordion.Content>
              </Menu.Item>

              <Menu.Item name="meshInput">
                <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={this.handleClick}
                >
                  Mesh Code
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <MeshInputContainer />
                  <MeshDetailsContainer />
                </Accordion.Content>
              </Menu.Item>
            </Accordion>
          </Sidebar>
          <Sidebar.Pusher>
            <MapContainer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
