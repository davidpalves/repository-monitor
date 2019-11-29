import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import CommitPage from './pages/CommitPage';
import TopNavbar from './app/MonitorApp/components/TopNavbar/TopNavbar'

const AppContainer = () => {

  return(
    <Router>
      <TopNavbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/commits" component={CommitPage} />
        </Switch>
    </Router>
  );
};

export default AppContainer;
