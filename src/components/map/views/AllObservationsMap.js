import React, { Component } from 'react';
import L from 'leaflet';
import { connect, PromiseState } from 'react-refetch';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';

import Loader from '../../helpers/Loader';
import Map from '../Map';

const API_URL = `https://data.keadatabase.nz/geojson/observations/`;

const defaultPointMarkerOptions = {
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

class AllObservationsMap extends Component {
  observationPointToLayer(feature, latlng) {
    var pointMarkerOptions = defaultPointMarkerOptions;

    // Color based on status
    switch (feature.properties.status) {
      case 'public':
        pointMarkerOptions.fillColor = '#df5206';
        break;
      case 'new':
        pointMarkerOptions.fillColor = '#ffffff';
        break;
      default:
        pointMarkerOptions.fillColor = '#000000';
    }

    // Radius based on number

    if (feature.properties.number > 10) pointMarkerOptions.radius = 10;
    else if (feature.properties.number > 5 && feature.properties.number <= 10)
      pointMarkerOptions.radius = 7;
    else pointMarkerOptions.radius = 5;

    return L.circleMarker(latlng, pointMarkerOptions);
  }

  observationOnEachFeature(feature, layer) {
    layer.bindPopup(`
      <a href="https://keadatabase.nz/observations/${feature.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
      </a>
    `);
  }

  render() {
    const { publicObservationsFetch, newObservationsFetch } = this.props;

    const allFetches = PromiseState.all([publicObservationsFetch, newObservationsFetch]);

    if (allFetches.pending) {
      return <Loader />;
    } else if (allFetches.rejected) {
      return <span>Error</span>;
    } else if (allFetches.fulfilled) {
      const [publicObservations, newObservations] = allFetches.value;
      return (
        <Map>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="Public Observations" checked>
              <GeoJSON
                data={publicObservations}
                pointToLayer={this.observationPointToLayer}
                onEachFeature={this.observationOnEachFeature}
                attribution="Data: KSP, KCT"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="New Observations" checked>
              <GeoJSON
                data={newObservations}
                pointToLayer={this.observationPointToLayer}
                onEachFeature={this.observationOnEachFeature}
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
  publicObservationsFetch: `${API_URL}?status=public&page_size=10000`,
  newObservationsFetch: `${API_URL}?status=new&page_size=10000`,
}))(AllObservationsMap);
