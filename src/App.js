import React, { Component } from 'react';
import { connect } from 'react-refetch'
import { GeoJSONLayer } from 'react-mapbox-gl';

import Map from './Map';
import './assets/App.css';

import fwf_blocks from './assets/fwf_blocks.geojson';

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
      return (
        <>
          <Map>
            <GeoJSONLayer
              data={ data }
              type='symbol'
              symbolLayout={{ 'icon-image': 'circle-15', 'icon-allow-overlap': true }}
            />
            <GeoJSONLayer
              data={ fwf_blocks }
              type='fill'
              fillPaint={{
                'fill-color': 'rgba(255,255,0,0.1)'
              }}
            />
            <GeoJSONLayer
              data={ fwf_blocks }
              type='line'
              linePaint={{
                'line-color': 'rgba(255,255,0,1)',
                'line-width': 2
              }}
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
