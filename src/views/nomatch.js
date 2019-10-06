import React from 'react';
import Helmet from 'react-helmet';

const NoMatchPage = props => {
  return (
    <div className="NoMatchPage">
      <Helmet title="Page Not Found" />
      <h1>Page Not Found</h1>
      <p>
        You seem to have encountered a page that doesn't exist. If you think it should exist, please
        contact us and we'll look into it.
      </p>
    </div>
  );
};

export default NoMatchPage;
