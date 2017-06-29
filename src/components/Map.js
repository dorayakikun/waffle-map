// @flow
import React, { PropTypes } from 'react'
import { Map as LeafletMap, Rectangle, TileLayer } from 'react-leaflet'

const Map = ({ boundsArray }: any) =>
  <LeafletMap center={[35.66666666666667, 139.5]} zoom={13}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {boundsArray
      .filter(bounds => bounds[0].length !== 0)
      .map(bounds => <Rectangle bounds={bounds} color="#00847e" />)}
  </LeafletMap>

Map.propTypes = {
  boundsArray: PropTypes.array.isRequired
}

export default Map
