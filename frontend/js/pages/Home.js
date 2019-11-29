import React, { useState } from 'react';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'
import WelcomeSession from '../app/MonitorApp/components/WelcomeSession/WelcomeSession'
import commits from '../services/commits'

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
