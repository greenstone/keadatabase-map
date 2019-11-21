import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { connect } from 'react-refetch';
import { GeoJSON as LeafletGeoJSON, latLngBounds } from 'leaflet';
import { Polyline, GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';
import { withRouter } from 'react-router-dom';

import Loader from '../../helpers/Loader';
import Map from '../Map';

const API_URL = `https://data.keadatabase.nz/geojson/birds/`;

const defaultPointMarkerOptions = {
  color: '#000',
  fillColor: '#df5206',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
  radius: 5,
};

class BirdMap extends Component {
  sightingPointToLayer(feature, latlng) {
    const pointMarkerOptions = Object.assign({}, defaultPointMarkerOptions);
    return L.circleMarker(latlng, pointMarkerOptions);
  }

  sightingOnEachFeature(feature, layer) {
    layer.bindPopup(`
      <a href="https://keadatabase.nz/sightings/${feature.properties.sighting}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.properties.sighting__date_sighted}</strong> (#${feature.properties.sighting})
      </a>
    `);
  }

  render() {
    const { birdSightings } = this.props;
    const birdTrace = birdSightings.features.map(birdSighting =>
      LeafletGeoJSON.coordsToLatLng(birdSighting.geometry.coordinates)
    );

    return (
      <Map bounds={latLngBounds(birdTrace)}>
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Paths">
            <Polyline positions={birdTrace} color="#000" weight={2} opacity={0.7} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Bird Sightings" checked>
            <GeoJSON
              data={birdSightings}
              pointToLayer={this.sightingPointToLayer}
              onEachFeature={this.sightingOnEachFeature}
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
    if (queryString && queryString.includes('bird')) this.props.lazyFetchBirdSightings(queryString);
  }

  render() {
    if (this.props.birdSightingsFetch) {
      const { birdSightingsFetch } = this.props;

      if (birdSightingsFetch.pending) {
        return <Loader />;
      } else if (birdSightingsFetch.rejected) {
        return <span>Error</span>;
      } else if (birdSightingsFetch.fulfilled) {
        const birdSightings = birdSightingsFetch.value;

        return <BirdMap birdSightings={birdSightings} />;
      }
    } else return <span>No parameters specified.</span>;
  }
}

TrackBird.propTypes = {
  'location.search': PropTypes.string,
};

export default withRouter(
  connect(props => ({
    lazyFetchBirdSightings: queryString => ({
      birdSightingsFetch: `${API_URL}${queryString}`,
    }),
  }))(TrackBird)
);
