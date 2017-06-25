// @flow

import { connect } from 'react-redux'

import React from 'react'
import { Map as LeafletMap, Rectangle, TileLayer } from 'react-leaflet'

import type { State } from '../types'

const Map = ({ centerCoords, boundsArray }) => {
  const nodes = boundsArray
    .filter(bounds => bounds[0].length !== 0)
    .map(bounds => {
      return <Rectangle bounds={bounds} color="#00847e" />
    })

  return (
    <LeafletMap center={[35.66666666666667, 139.5]} zoom={13}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {nodes}
    </LeafletMap>
  )
}

const mapStateToProps = (state: State) => {
  return {
    centerCoords: state.centerCoords,
    boundsArray: state.boundsArray
  }
}

const connector = connect(mapStateToProps)

export default connector(Map)

// <Rectangle bounds={bounds2} />
// <Marker position={position2}>
//   <Popup>
//     <span>Second Mesh</span>
//   </Popup>
// </Marker>
