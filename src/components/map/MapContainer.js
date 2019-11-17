import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import qsOptions from '../../config/qsOptions';
import ExtendedMap from './ExtendedMap';
import defaultQuery from '../../config/defaultQuery';

/**
  MapContainer encloses the ExtendedMap layer, adding the the additional handling of queryStrings,
  and context aware CSS classes.
 */
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryObject: {},
    };
  }

  updateStateFromQueryObject() {
    // Store query string in state
    const queryString = this.props.location.search ? this.props.location.search : defaultQuery;

    this.setState({
      queryObject: qs.parse(queryString, qsOptions),
    });
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryObject();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location) this.updateStateFromQueryObject();
  }

  render() {
    const { embed } = this.props;
    const classes = ['MapContainer', embed ? 'embed' : 'index'].join(' ');

    return (
      <div className={classes}>
        <ExtendedMap queryObject={this.state.queryObject} />
      </div>
    );
  }
}

MapContainer.propTypes = {
  embed: PropTypes.bool.isRequired,
  'location.search': PropTypes.string,
};

MapContainer.defaultProps = {
  embed: false,
};

export default withRouter(MapContainer);
