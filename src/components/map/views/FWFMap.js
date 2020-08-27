import React, { Component } from 'react';
import L from 'leaflet';
import { connect } from 'react-refetch';
import { GeoJSON, LayersControl, ScaleControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import moment from 'moment';

import Loader from '../../helpers/Loader';
import Map from '../Map';
import { FWF_BOUNDS } from '../defaults';

import blocks from '../../../assets/geo/blocks.json';

const API_URL = `${process.env.REACT_APP_API_BASE}/geojson/observations/`;

const fwfPeriods = [
  {
    id: null,
    label: null,
    start: null,
    end: null,
  },
  {
    id: 1,
    label: 'Period 1',
    start: moment('0000-03-20'),
    end: moment('0000-03-30'),
  },
  {
    id: 2,
    label: 'Period 2',
    start: moment('0000-03-31'),
    end: moment('0000-04-09'),
  },
  {
    id: 3,
    label: 'Period 3',
    start: moment('0000-04-10'),
    end: moment('0000-04-20'),
  },
];

const momentParse = 'YYYY-MM-DD';

const defaultPointMarkerOptions = {
  color: '#000',
  fillColor: '#df5206',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const LegendItem = ({ label, markerSize, markerFill }) => (
  <div className="form-row align-items-center">
    <dt className="col-6">
      <svg height={28} width={28}>
        <g>
          <circle cx="14" cy="14" r={markerSize} className="marker" fill={markerFill} />
        </g>
      </svg>
    </dt>
    <dd className="col-6 m-0">{label}</dd>
  </div>
);

const Legend = () => (
  <Control position="bottomright">
    <div className="legend leaflet-control-layers">
      <h2 className="sr-only">Legend</h2>
      <h3>Kea observed</h3>
      <dl className="m-0">
        <LegendItem label="10+" markerSize={10} markerFill="#df5206" />
        <LegendItem label="5–9" markerSize={7} markerFill="#df5206" />
        <LegendItem label="1–4" markerSize={5} markerFill="#df5206" />
        <LegendItem label="0" markerSize={5} markerFill="#ffffff" />
      </dl>
    </div>
  </Control>
);

class FWFMap extends Component {
  blockOnEachFeature(feature, layer) {
    layer.bindTooltip(
      `
      ${feature.properties.HuntBlockN}
    `,
      { direction: 'center' }
    );
  }

  observationPointToLayer(feature, latlng) {
    const pointMarkerOptions = Object.assign({}, defaultPointMarkerOptions);

    // Radius based on number
    if (feature.properties.number >= 10) pointMarkerOptions.radius = 10;
    else if (feature.properties.number >= 5 && feature.properties.number < 10)
      pointMarkerOptions.radius = 7;
    else pointMarkerOptions.radius = 5;

    // Colour based on number
    if (feature.properties.number === 0) pointMarkerOptions.fillColor = '#fff';

    return L.circleMarker(latlng, pointMarkerOptions);
  }

  observationOnEachFeature(feature, layer) {
    // Period based on date_sighted
    const period = (function(observationDate) {
      const observationDateParsed = moment(observationDate, momentParse).year('0000');

      return fwfPeriods.reduce((accumulator, currentValue) => {
        return moment(observationDateParsed).isBetween(
          currentValue.start,
          currentValue.end,
          'day',
          '[]'
        )
          ? currentValue
          : accumulator;
      });
    })(feature.properties.date_sighted);

    // Observation year
    const year = moment(feature.properties.date_sighted).year();

    // Create date/period string
    const dateString = `${period.id ? 'during' : 'on'} ${period.label ||
      feature.properties.date_sighted} ${period.id ? year : ''}`;

    layer.bindPopup(`
      <a href="https://keadatabase.nz/observations/${feature.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} ${dateString}
      </a>
    `);
  }

  render() {
    const { fwfObservationsFetch } = this.props;

    if (fwfObservationsFetch.pending) {
      return <Loader />;
    } else if (fwfObservationsFetch.rejected) {
      return <span>Error</span>;
    } else if (fwfObservationsFetch.fulfilled) {
      const fwfObservations = fwfObservationsFetch.value;
      return (
        <Map bounds={FWF_BOUNDS}>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="FWF Blocks" checked>
              <GeoJSON
                data={blocks}
                style={{
                  color: '#222222',
                  weight: 2,
                  opacity: 0.6,
                  fillOpacity: 0,
                }}
                onEachFeature={this.blockOnEachFeature}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="FWF Observations" checked>
              <GeoJSON
                data={fwfObservations}
                pointToLayer={this.observationPointToLayer}
                onEachFeature={this.observationOnEachFeature}
                attribution="Data: FWF, KCT, KSP"
              />
            </LayersControl.Overlay>
          </LayersControl>
          <Legend />
          <ScaleControl />
        </Map>
      );
    }
  }
}

export default connect(props => ({
  fwfObservationsFetch: `${API_URL}?status=fwf&page_size=10000`,
}))(FWFMap);
