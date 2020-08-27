import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { connect } from 'react-refetch';
import { GeoJSON as LeafletGeoJSON, latLngBounds } from 'leaflet';
import { Polyline, GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';
import { withRouter } from 'react-router-dom';

import Loader from '../../helpers/Loader';
import Map from '../Map';

const API_URL = `${process.env.REACT_APP_API_BASE}/geojson/bird_observations/`;

const defaultPointMarkerOptions = {
  color: '#000',
  fillColor: '#df5206',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
  radius: 5,
};

class BirdMap extends Component {
  observationPointToLayer(feature, latlng) {
    const pointMarkerOptions = Object.assign({}, defaultPointMarkerOptions);
    return L.circleMarker(latlng, pointMarkerOptions);
  }

  observationOnEachFeature(feature, layer) {
    layer.bindPopup(`
      <a href="https://keadatabase.nz/observations/${feature.properties.sighting}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.properties.sighting__date_sighted}</strong> (#${feature.properties.sighting})
      </a>
    `);
  }

  render() {
    const { birdObservations } = this.props;
    const birdTrace = birdObservations.features.map(birdObservation =>
      LeafletGeoJSON.coordsToLatLng(birdObservation.geometry.coordinates)
    );

    return (
      <Map bounds={latLngBounds(birdTrace)}>
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Paths">
            <Polyline positions={birdTrace} color="#000" weight={2} opacity={0.7} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Bird Observations" checked>
            <GeoJSON
              data={birdObservations}
              pointToLayer={this.observationPointToLayer}
              onEachFeature={this.observationOnEachFeature}
              attribution="Data: FWF, KCT, KSP"
            />
          </LayersControl.Overlay>
        </LayersControl>
        <ScaleControl />
      </Map>
    );
  }
}

class TrackBird extends Component {
  componentDidMount() {
    const queryString = this.props.location.search ? this.props.location.search : '';

    // Check that the queryString has a bird specified—not foolproof, but good enough for this purpose
    if (queryString && queryString.includes('bird'))
      this.props.lazyFetchBirdObservations(queryString);
  }

  render() {
    if (this.props.birdObservationsFetch) {
      const { birdObservationsFetch } = this.props;

      if (birdObservationsFetch.pending) {
        return <Loader />;
      } else if (birdObservationsFetch.rejected) {
        return <span>Error</span>;
      } else if (birdObservationsFetch.fulfilled) {
        const birdObservations = birdObservationsFetch.value;

        return <BirdMap birdObservations={birdObservations} />;
      }
    } else return <span>No parameters specified.</span>;
  }
}

TrackBird.propTypes = {
  'location.search': PropTypes.string,
};

export default withRouter(
  connect(props => ({
    lazyFetchBirdObservations: queryString => ({
      birdObservationsFetch: `${API_URL}${queryString}`,
    }),
  }))(TrackBird)
);
