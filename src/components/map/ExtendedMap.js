import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { LayersControl, ScaleControl } from 'react-leaflet';
import hash from 'object-hash';

import qsOptions from '../../config/qsOptions';
import Layer from './Layer';
import Map from './Map';
import Loader from '../helpers/Loader';

import './ExtendedMap.css';

class ExtendedMap extends Component {
  constructor(props) {
    super(props);
    this.handleLayerStatus = this.handleLayerStatus.bind(this);
    this.state = {};
  }

  handleLayerStatus(layerStatus) {
    this.setState(layerStatus);
  }

  render() {
    const { queryObject } = this.props;

    const queryObjectLayers = queryObject.layers || null;
    const title = queryObject.title || null;
    const description = queryObject.description || null;

    // Convert each layer into a label and formatted queryString
    const layers = queryObjectLayers
      ? queryObjectLayers.map(layer => {
          const key = hash(layer);
          const { label, ...queryObject } = layer;
          const queryString = qs.stringify(queryObject, qsOptions);
          return { label, key, queryString };
        })
      : null;

    return (
      <Map>
        {layers && (
          <LayersControl position="topright" collapsed={false}>
            {layers.map((layer, index) => (
              <LayersControl.Overlay name={layer.label} key={layer.key} checked>
                <Layer
                  queryString={layer.queryString}
                  id={layer.key}
                  onLayerFetch={this.handleLayerStatus}
                />
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        )}
        <ScaleControl />
        <div className="information-box">
          {title && <h1>{title}</h1>}
          {description && <p className="m-0">{description}</p>}

          {/*<ul>
            { Object.keys(this.state).map((key) =>
              <li key={key}>Layer {key}: {this.state[key].pending ? <Loader /> : null}</li>
            )}
          </ul> */}
        </div>
      </Map>
    );
  }
}

ExtendedMap.propTypes = {
  queryObject: PropTypes.object.isRequired,
};

export default ExtendedMap;
