import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { LayersControl, ScaleControl } from 'react-leaflet';

import qsOptions from '../../config/qsOptions';
import Layer from './Layer';
import Map from './Map';

class ExtendedMap extends Component {
  render() {
    const queryObjectLayers = this.props.queryObject.layers || null;

    // Convert each layer into a label and formatted queryString
    const layers = queryObjectLayers
      ? queryObjectLayers.map(layer => {
          const { label, ...queryObject } = layer;
          const queryString = qs.stringify(queryObject, qsOptions);
          return { label, queryString };
        })
      : null;
    console.log(layers);

    return (
      <Map>
        {layers && (
          <LayersControl position="topright" collapsed={false}>
            {layers.map((layer, index) => (
              <LayersControl.Overlay name={layer.label} key={index} checked>
                <Layer queryString={layer.queryString} />
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        )}
        <ScaleControl />
      </Map>
    );
  }
}

ExtendedMap.propTypes = {
  queryObject: PropTypes.object.isRequired,
};

export default ExtendedMap;
