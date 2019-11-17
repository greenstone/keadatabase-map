import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light fixed-top navbar-expand">
        <Link to="/" className="navbar-brand">
          Kea Map
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              exact
              to="/?layers[0][status]=new&layers[0][page_size]=10000&layers[0][label]=New Sightings&layers[1][status]=public&layers[1][page_size]=10000&layers[1][label]=Moderated Sightings&layers[2][label]=Captive Sightings&layers[2][status]=captive&layers[2][page_size]=10000"
            >
              All
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/?layers[0][label]=FWF Sightings&layers[0][status]=fwf"
            >
              FWF
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
