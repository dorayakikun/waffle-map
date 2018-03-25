import * as React from 'react'
import { Accordion, Image, Menu, Sidebar, AccordionTitleProps } from 'semantic-ui-react'

import { MarkerInputContainer } from './MarkerInputContainer'
import { MeshCodeInputContainer } from './MeshInputContainer'
import { MeshDetailsContainer } from './MeshDetailsContainer'
import { MapContainer } from './MapContainer'
import { TileToggleContainer } from './TileToggleContainer'
import { MeshToggleContainer } from './MeshToggleContainer'

type Props = {
  activeIndex: number,
}

type State = {
  activeIndex: number,
}

type AccordionMenuItemValue = {
  index: number,
  title: string,
  container: any,
}

const ACCORDION_MENU_ITEM_VALUES: AccordionMenuItemValue[] = [
  { index: 0, title: 'Tile Grid', container: <TileToggleContainer /> },
  { index: 1, title: 'Mesh Grid', container: <MeshToggleContainer /> },
  { index: 2, title: 'Marker', container: <MarkerInputContainer /> },
  {
    index: 3,
    title: 'Mesh Code',
    container: (
      <div>
        <MeshCodeInputContainer />
        <MeshDetailsContainer />
      </div>
    ),
  },
]

export class AppContainer extends React.Component<Props, State> {
  state = { activeIndex: 3 }

  handleClick = (e: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => {
    const index = data.index as number
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)', height: '100%' }}>
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

              {ACCORDION_MENU_ITEM_VALUES.map(
                (value: AccordionMenuItemValue, key: number) => (
                  <Menu.Item name="meshInput" key={key}>
                    <Accordion.Title
                      active={activeIndex === value.index}
                      index={value.index}
                      onClick={this.handleClick}
                    >
                      {value.title}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === value.index}>
                      {value.container}
                    </Accordion.Content>
                  </Menu.Item>
                )
              )}
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
