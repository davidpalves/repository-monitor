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

    this.getRepositoryData = this.getRepositoryData.bind(this);
    this.redirectCommitsList = this.redirectCommitsList.bind(this);
  }

  componentDidMount() {
    this.getRepositoryData();
  }

  async getRepositoryData() {
    const id = this.props.match.params.repositoryId

    const { data } = await repositories.getRepository(id);

    this.setState({
      data
    });
  }


  async redirectCommitsList() {
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
        <CommitList
          commit={data.commits}
          fullName={data.full_name}
          id={data.id}
        />
        <SideBar getData={this.redirectCommitsList}/>
      </div>
    );
  }
}

export default RepositoryDetailPage;
