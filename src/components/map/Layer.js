import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { connect } from 'react-refetch';
import { GeoJSON } from 'react-leaflet';

import Loader from '../helpers/Loader';

const API_URL = `https://data.keadatabase.nz/geojson/sightings/`;

const defaultPointMarkerOptions = {
  color: '#333',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

/**
  Layer takes a given queryString, then fetches, renders and outputs the layer as a
  Leaflet object.
 */
class Layer extends Component {
  componentDidMount() {
    this.props.lazyFetchLayer(this.props.queryString);
  }

  componentDidUpdate(prevProps) {
    if (this.props.queryString !== prevProps.queryString)
      this.props.lazyFetchLayer(this.props.queryString);
    if (this.props.layerFetch !== prevProps.layerFetch) {
      this.props.onLayerFetch({ [this.props.id]: this.props.layerFetch });
    }
  }

  sightingPointToLayer(feature, latlng) {
    var pointMarkerOptions = defaultPointMarkerOptions;

    // Color based on status
    switch (feature.properties.status) {
      case 'public':
        pointMarkerOptions.fillColor = '#df5206';
        break;
      case 'new':
        pointMarkerOptions.fillColor = '#ffffff';
        break;
      case 'fwf':
        pointMarkerOptions.fillColor = '#add8e6';
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

  sightingOnEachFeature(feature, layer) {
    layer.bindPopup(`
      <a href="https://keadatabase.nz/sightings/${feature.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
      </a>
    `);
  }

  render() {
    if (this.props.layerFetch) {
      const { layerFetch } = this.props;
      if (layerFetch.pending) {
        return <Loader />;
      } else if (layerFetch.rejected) {
        return <span>Error</span>;
      } else if (layerFetch.fulfilled) {
        const layer = layerFetch.value;
        return (
          <GeoJSON
            data={layer}
            pointToLayer={this.sightingPointToLayer}
            onEachFeature={this.sightingOnEachFeature}
          />
        );
      }
    } else return null;
  }
}

Layer.propTypes = {
  id: PropTypes.string.isRequired,
  queryString: PropTypes.string.isRequired,
  onLayerFetch: PropTypes.func.isRequired,
};

export default connect(props => ({
  lazyFetchLayer: queryString => ({
    layerFetch: `${API_URL}${queryString}`,
  }),
}))(Layer);
