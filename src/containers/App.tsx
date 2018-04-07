import * as React from 'react'
import {
  Accordion,
  AccordionTitleProps,
  Image,
  Menu,
  Sidebar,
} from 'semantic-ui-react'

import { GeodeticInputContainer } from './GeodeticInputContainer'
import { MapContainer } from './MapContainer'
import { MarkerInputContainer } from './MarkerInputContainer'
import { MeshDetailsContainer } from './MeshDetailsContainer'
import { MeshCodeInputContainer } from './MeshInputContainer'
import { MeshToggleContainer } from './MeshToggleContainer'
import { TileToggleContainer } from './TileToggleContainer'

interface Props {
  activeIndex: number
}

interface State {
  activeIndex: number
}

interface AccordionMenuItemValue {
  index: number
  title: string
  container: any
}

const ACCORDION_MENU_ITEM_VALUES: AccordionMenuItemValue[] = [
  { container: <TileToggleContainer />, index: 0, title: 'Tile Grid' },
  { container: <MeshToggleContainer />, index: 1, title: 'Mesh Grid'  },
  { container: <MarkerInputContainer />, index: 2, title: 'Marker' },
  {
    container: (
      <div>
        <MeshCodeInputContainer />
        <MeshDetailsContainer />
      </div>
    ),
    index: 3,
    title: 'Mesh Code',
  },
]

export class AppContainer extends React.Component<Props, State> {
  public state = { activeIndex: 3 }

  public handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    data: AccordionTitleProps
  ) => {
    const index = data.index as number
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  public render() {
    const { activeIndex } = this.state
    return (
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)', height: '100%' }}>
        <Sidebar.Pushable>
          <Sidebar visible={true} width="wide">
            <Accordion
              as={Menu}
              fluid={true}
              inverted={true}
              vertical={true}
              style={{ height: '100%' }}
            >
              <Menu.Item name="waffleMap">
                <Image src="./images/logo.png" size="mini" spaced={true} />
                <strong>Waffle Map</strong>
              </Menu.Item>

              <Menu.Item name="Geodetic">
                <GeodeticInputContainer />
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
