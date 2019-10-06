import React from 'react';

import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light fixed-top">
        <Link to="/" className="navbar-brand">
          Kea Map
        </Link>
      </nav>
    </header>
  );
};

export default Header;
