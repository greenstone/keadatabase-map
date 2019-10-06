import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapContainer from './components/map/MapContainer';
import Header from './components/presentation/Header';
import NoMatchPage from './views/nomatch';

/**
  Main App component. Shows MapContainer on both / and /embed, only shows Header on /.
 */
const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Header} />
        <Switch>
          <Route exact path="/">
            <MapContainer />
          </Route>
          <Route exact path="/embed">
            <MapContainer embed />
          </Route>

          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
