import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { allQuery, fwfQuery } from '../../config/queries';

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
            <NavLink className="nav-link" exact to={allQuery}>
              All
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={fwfQuery}>
              FWF
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
