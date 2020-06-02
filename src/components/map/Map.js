import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import Header from '../presentation/Header';
import qsOptions from '../../config/qsOptions';
import { DEFAULT_BOUNDS } from './defaults';

// Import CSS/JS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: props.bounds || DEFAULT_BOUNDS,
      queryObject: {},
    };
  }

  updateStateFromQueryObject() {
    // Store query string in state
    const queryString = this.props.location.search ? this.props.location.search : '';

    this.setState({
      queryObject: qs.parse(queryString, qsOptions),
    });
  }

  updateBounds() {
    this.setState({
      bounds: this.props.bounds,
    });
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryObject();
    this.updateBounds();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryObject();
    if (this.props.bounds !== prevProps.bounds) this.updateBounds();
  }

  render() {
    const { children } = this.props;
    const embed = 'embed' in this.state.queryObject ? true : false;
    const classes = ['Map', embed ? 'embed' : 'index'].join(' ');

    return (
      <>
        {!embed && <Header />}
        <div className={classes}>
          <LeafletMap className="map" minZoom={6} maxZoom={14} bounds={this.state.bounds}>
            <TileLayer
              attribution="Mapbox"
              url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`}
            />
            <TileLayer
              url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.REACT_APP_LINZ_API_KEY}/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png`}
              minZoom={10}
              maxZoom={12}
              subdomains={'abcd'}
            />
            <TileLayer
              url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.REACT_APP_LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`}
              attribution="LINZ, licensed for reuse (CC BY 4.0)."
              minZoom={12}
              subdomains={'abcd'}
            />
            {children}
          </LeafletMap>
        </div>
      </>
    );
  }
}

Map.propTypes = {
  'location.search': PropTypes.string,
  bounds: PropTypes.object,
};

export default withRouter(Map);
