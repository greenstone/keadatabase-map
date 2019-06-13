import React, { Component } from 'react';
import { connect } from 'react-refetch'
import L from 'leaflet';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';

import Loader from './helpers/Loader';
import Map from './Map';
import './assets/App.css';

const defaultPointMarkerOptions = {
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

class App extends Component {
  sightingPointToLayer(feature, latlng) {
    var pointMarkerOptions = defaultPointMarkerOptions;

    // Color based on status
    switch (feature.properties.status) {
      case 'public': pointMarkerOptions.fillColor = "#df5206"; break;
      case 'new': pointMarkerOptions.fillColor = "#ffffff"; break;
      default: pointMarkerOptions.fillColor = "#000000";
    }

    // Radius based on number

    if (feature.properties.number > 10) pointMarkerOptions.radius = 10;
    else if (feature.properties.number > 5 && feature.properties.number <= 10) pointMarkerOptions.radius = 7;
    else pointMarkerOptions.radius = 5;

    return L.circleMarker(
      latlng,
      pointMarkerOptions
    );
  }

  sightingOnEachFeature(feature, layer) {
    layer.bindPopup(`
      <a href="https://keadatabase.nz/sightings/${feature.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
      </a>
    `);
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
        <Map>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="<strong>Sightings</strong>" checked>
              <GeoJSON
                data={ data }
                pointToLayer={this.sightingPointToLayer}
                onEachFeature={this.sightingOnEachFeature}
                />
            </LayersControl.Overlay>
          </LayersControl>
          <ScaleControl />
        </Map>
      );
    }
  }
}

export default connect(props => ({
  sightingsFetch: `https://data.keadatabase.nz/geojson/sightings/?page_size=10000`
}))(App)
