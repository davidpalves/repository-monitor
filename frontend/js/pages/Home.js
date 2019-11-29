import React, { useState } from 'react';
import WelcomeSession from '../app/MonitorApp/components/WelcomeSession/WelcomeSession'

import '../../sass/pages/home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  }

  render() {
    return (
      <div>
        <WelcomeSession/>
      </div>
    );
  }
}

export default Home;
