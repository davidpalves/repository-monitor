import React from 'react';
import CommitCard from './CommitCard';

import './style.scss'

class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { commit } = this.props;
    return (
      <div className="commit-section">
        <h1 className="commits-section-title">Latest commits</h1>
          {
            commit && commit.map(( item, key ) => {
                return (
                  <CommitCard item={item}/>
                )
            })
          }
      </div>
    );
  }
}

export default CommitList;
