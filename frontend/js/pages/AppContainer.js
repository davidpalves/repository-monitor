import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';

import Home from './Home';
import CommitPage from './CommitPage';
import RepositoryDetailPage from './RepositoryDetailPage';

const AppContainer = () => {
  return (
    <Router>
      <TopNavbar />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={CommitPage} exact path="/commits" />
        <Route component={RepositoryDetailPage} path="/repository/:repositoryId" />
      </Switch>
    </Router>
  );
};

export default AppContainer;
