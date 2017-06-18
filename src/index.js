import React from 'react'
import ReactDOM from 'react-dom'
import { Statistic } from 'semantic-ui-react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [35.6638, 139.71805]

ReactDOM.render(
  <div>
    <Statistic color="teal" value="Hello, world!" label="teal" />
    <Map center={position} zoom={13}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>
          <span>A pretty CSS3 popup.<br />Easily customizable.</span>
        </Popup>
      </Marker>
    </Map>
  </div>,
  document.getElementById('root')
)
