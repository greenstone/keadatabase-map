import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecentSightingsMap from './components/map/views/RecentSightingsMap';
import FWFMap from './components/map/views/FWFMap';
import HelpPage from './views/help';
import NoMatchPage from './views/nomatch';

/**
  Main App component. Shows MapContainer on both / and /embed, only shows Header on /.
 */
const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <RecentSightingsMap />
          </Route>
          <Route exact path="/fwf">
            <FWFMap />
          </Route>
          <Route exact path="/help">
            <HelpPage />
          </Route>

          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
