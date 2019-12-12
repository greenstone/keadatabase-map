import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecentObservationsMap from './components/map/views/RecentObservationsMap';
import FWFMap from './components/map/views/FWFMap';
import AllSightingsMap from './components/map/views/AllSightingsMap';
import TrackBird from './components/map/views/TrackBird';
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
            <RecentObservationsMap />
          </Route>
          <Route exact path="/fwf">
            <FWFMap />
          </Route>
          <Route exact path="/help">
            <HelpPage />
          </Route>
          <Route exact path="/track">
            <TrackBird />
          </Route>
          <Route exact path="/all">
            <AllSightingsMap />
          </Route>
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
