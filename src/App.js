import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { connect } from 'react-refetch'

import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import 'leaflet/dist/leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import './App.css';

// Leaflet marker fix
let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon

class App extends Component {
  render() {
    const { sightingsFetch } = this.props

    if (sightingsFetch.pending) {
      return <span>Loading</span>
    }
    else if (sightingsFetch.rejected) {
      return <span>Error</span>
    }
    else if (sightingsFetch.fulfilled) {
      const data = sightingsFetch.value
      return <>
          <Map center={[-43.983333, 170.45]} zoom={7} id="map">
            <GeoJSON
              data={data} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
        </Map>
      </>
    }
  }
}

export default connect(props => ({
  sightingsFetch: `https://data.keadatabase.nz/geojson/sightings/?page_size=10000`
}))(App)
