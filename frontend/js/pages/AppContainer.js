import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';

import Home from './Home';
import CommitPage from './CommitPage';
import NotFoundPage from './NotFoundPage';
import RepositoryDetailPage from './RepositoryDetailPage';

const AppContainer = () => {
  return (
    <Router>
      <TopNavbar />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={CommitPage} exact path="/commits" />
        <Route component={RepositoryDetailPage} path="/repository/:repositoryId" />
        <Route component={NotFoundPage} path="/404" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default AppContainer;
