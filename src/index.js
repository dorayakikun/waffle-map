// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Statistic } from 'semantic-ui-react'
import { Map, Marker, Popup, Rectangle, TileLayer } from 'react-leaflet'

const position1 = [35.66666666666667, 139.5]
const bounds1 = [[36, 139], [35.333333333333336, 140]]

const position2 = [35.625, 139.6875]
const bounds2 = [[35.66666666666667, 139.625], [35.583333333333336, 139.75]]

const position3 = [35.6625, 139.71875]
const bounds3 = [[[35.666666666666664, 139.7125], [35.65833333333333, 139.725]]]

ReactDOM.render(
  <div>
    <Statistic color="teal" value="Hello, world!" label="teal" />
    <Map center={position1} zoom={13}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Rectangle bounds={bounds1} />
      <Marker position={position1}>
        <Popup>
          <span>First Mesh</span>
        </Popup>
      </Marker>
      <Rectangle bounds={bounds2} color="#00ff00" />
      <Marker position={position2}>
        <Popup>
          <span>Second Mesh</span>
        </Popup>
      </Marker>
      <Rectangle bounds={bounds3} color="#ff0000" />
      <Marker position={position3}>
        <Popup>
          <span>Third Mesh</span>
        </Popup>
      </Marker>
    </Map>
  </div>,
  document.getElementById('root')
)
