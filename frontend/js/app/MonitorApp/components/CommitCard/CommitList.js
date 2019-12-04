import React from 'react';

import CommitCard from './CommitCard';
import Pagination from '../Pagination/Pagination';

import './style.scss';

class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getPage = this.getPage.bind(this);

  }

  async getPage(page){
    const { getData } = this.props;
    await getData(page);
  }

  render() {
    const { commit, fullName, id } = this.props;


    return (
      <div className="commit-section">
        <div className="title-header">
          <h1 className="commits-section-title">Latest commits {fullName && `on ${fullName}`}</h1>
          {
           (commit && (commit.next || commit.previous))
           &&
           (<Pagination getPage={this.getPage} nextPage={commit.next} prevPage={commit.previous}/>)
          }
        </div>
        {commit &&
          (commit.results || commit).map((item, index) => {
            return (
              <CommitCard
                key={index}
                fullName={fullName}
                id={item.repository.id || id}
                item={item}
              />
            );
          })}
      </div>
    );
  }
}

export default CommitList;
