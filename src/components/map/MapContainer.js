import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import GeoJSONMap from './GeoJSONMap';

const qsOptions = {
  encode: false,
  arrayFormat: 'brackets',
  ignoreQueryPrefix: true,
  addQueryPrefix: true,
  allowDots: true,
};

/**
  MapContainer adds the additional handling of queryStrings to the GeoJSONMap component.
 */
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: {},
    };
  }

  updateStateFromQueryString() {
    // Store query string in state
    if (this.props.location) {
      this.setState({
        queryString: qs.parse(this.props.location.search, qsOptions),
      });
    }
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryString();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryString();
  }

  render() {
    const { embed } = this.props;
    const classes = ['MapContainer', embed ? 'embed' : 'index'].join(' ');

    return (
      <div className={classes}>
        <GeoJSONMap queryString={this.state.queryString} />
      </div>
    );
  }
}

MapContainer.propTypes = {
  embed: PropTypes.bool.isRequired,
};

MapContainer.defaultProps = {
  embed: false,
};

export default MapContainer;
