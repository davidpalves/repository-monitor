import React from 'react';
import { hot } from 'react-hot-loader';

import SentryBoundary from './utils/SentryBoundary';
import AppContainer from './pages/AppContainer'

const App = () => {

  return(
    <SentryBoundary>
      <AppContainer/>
    </SentryBoundary>
  );
};

export default hot(module)(App);
