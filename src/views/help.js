import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const HelpPage = props => {
  return (
    <div className="HelpPage">
      <Helmet title="Help" />
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Return
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="container my-2">
        <h1>Help</h1>
        <p>The Kea Map is an additional service building on the main Kea Database.</p>
        <h2>Embed</h2>
        <p>
          Add <code>?embed</code> to the URLs of each map to remove the header bar.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
