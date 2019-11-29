import React, { useState } from 'react';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'
import CommitList from '../app/MonitorApp/components/CommitCard/CommitList'
import commits from '../services/commits'

import '../../sass/pages/home.scss'

class CommitPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
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
        <CommitList commit={data}/>
        <SideBar getData={this.getData}/>
      </div>
    );
  }
}

export default CommitPage;
