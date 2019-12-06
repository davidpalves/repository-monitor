import React from 'react';

import { CommitList, Loading, SideBar,TopNavbar } from '../app/MonitorApp/components';

import commits from 'services/commits';

import '../../sass/pages/home.scss';

class CommitPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData(pageUrl=null) {
    this.setState({ loading: true });
    const { data } = await commits.getCommits(pageUrl).then(response => {
      this.setState({ loading: false });
      return response;
    });

    this.setState({ data });
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <TopNavbar/>
        {
          loading 
          ? <Loading loading={loading} />
          : <CommitList commit={data} getData={this.getData}s/>
        }
        <SideBar getData={this.getData}/>
      </div>
    );
  }
}

export default CommitPage;
