import React from 'react';

import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'
import CommitList from '../app/MonitorApp/components/CommitCard/CommitList'
import repositories from '../services/repositories'

import '../../sass/pages/home.scss'

class RepositoryDetailPage extends React.Component {
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
    const { data } = await repositories.getRepository(17);

    this.setState({
      data
    });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <TopNavbar/>
        <CommitList commit={data.commits}/>
        <SideBar getData={this.getData}/>
      </div>
    );
  }
}

export default RepositoryDetailPage;
