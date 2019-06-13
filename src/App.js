import React, { Component } from 'react';
import { connect } from 'react-refetch'
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';

import Loader from './helpers/Loader';
import Map from './Map';
import './assets/App.css';

const defaultPointMarkerOptions = {
    radius: 6,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

class App extends Component {
  sightingPointToLayer(feature, latlng) {
    var pointMarkerOptions = defaultPointMarkerOptions;

    switch (feature.properties.status) {
      case 'public': pointMarkerOptions.fillColor = "#df5206"; break;
      case 'new': pointMarkerOptions.fillColor = "#ffffff"; break;
      default: pointMarkerOptions.fillColor = "#000000";
    }

    return L.circleMarker(
      latlng,
      pointMarkerOptions
    );
  }

  render() {
    const { sightingsFetch } = this.props

    if (sightingsFetch.pending) {
      return <Loader />
    }
    else if (sightingsFetch.rejected) {
      return <span>Error</span>
    }
    else if (sightingsFetch.fulfilled) {
      const data = sightingsFetch.value
      return (
        <>
          <Map>
            <GeoJSON
              data={ data }
              pointToLayer={this.sightingPointToLayer}
              />
          </Map>
        </>
      );
    }
  }
}

export default connect(props => ({
  sightingsFetch: `https://data.keadatabase.nz/geojson/sightings/?page_size=10000`
}))(App)
