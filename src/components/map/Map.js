import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

// Import CSS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css';

// Import JS from Leaflet and plugins.
import 'leaflet/dist/leaflet';

/**
  Map is common across Kea Database projects, and builds on Leaflet to automatically include the 
  Mapbox outdoors basemap and LINZ topographic tiles.
 */
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.lat || -43.983333,
      lng: props.lng || 170.45,
      zoom: props.zoom || 7,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <LeafletMap
        className="map"
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        minZoom={7}
        maxZoom={14}
      >
        <TileLayer
          attribution="Mapbox"
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`}
        />
        <TileLayer
          url={`https://tiles-a.data-cdn.linz.govt.nz/services;key=${process.env.REACT_APP_LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`}
          attribution="LINZ, licensed for reuse under the CC BY 4.0."
          minZoom={11}
        />
        {children}
      </LeafletMap>
    );
  }
}

export default Map;
