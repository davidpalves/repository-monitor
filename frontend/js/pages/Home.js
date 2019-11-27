import React, { useState } from 'react';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'
import CommitCard from '../app/MonitorApp/components/CommitCard/CommitCard'
import commits from '../services/commits'

import '../../sass/pages/home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const { data } = await commits.getCommits();

    this.setState({
      data
    });
  }
 
  render() {
    const { data } = this.state;
    return (
      <div>
        <TopNavbar/>
        <CommitCard commit={data}/>
        <SideBar/>
      </div>
    );
  }
}

export default Home;
