import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light fixed-top navbar-expand">
        <Link to="/" className="navbar-brand">
          Kea Map
        </Link>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home (Recent)
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/fwf">
              FWF
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/help">
              Help
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
