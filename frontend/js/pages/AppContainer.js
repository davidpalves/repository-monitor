import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import CommitPage from './CommitPage';
import RepositoryDetailPage from './RepositoryDetailPage';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar'

const AppContainer = () => {

  return(
    <Router>
      <TopNavbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/commits" component={CommitPage} />
          <Route exact path="/repository/:repositoryId" component={RepositoryDetailPage} />
        </Switch>
    </Router>
  );
};

export default AppContainer;
