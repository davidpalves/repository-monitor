import React from 'react';

import CommitList from '../app/MonitorApp/components/CommitCard/CommitList'
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'
import Loading from '../app/MonitorApp/components/Loading/Loading'
import repositories from '../services/repositories'

import '../../sass/pages/home.scss'

class RepositoryDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    };

    this.getRepositoryData = this.getRepositoryData.bind(this);
  }

  componentDidMount() {
    this.getRepositoryData();
  }

  async getRepositoryData() {
    const id = this.props.match.params.repositoryId
    this.setState({ loading: true });

    const { data } = await repositories.getRepository(id).then(response => {
      this.setState({ loading: false });
      return response;
    });

    this.setState({
      data
    });
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <TopNavbar/>
        {loading ?
          <Loading loading={loading}/> :
          <CommitList
            commit={data.commits}
            fullName={data.full_name}
            id={data.id}
          />
        }
        <SideBar/>
      </div>
    );
  }
}

export default RepositoryDetailPage;
