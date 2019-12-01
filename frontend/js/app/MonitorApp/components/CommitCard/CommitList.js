import React from 'react';

import CommitCard from './CommitCard';

import './style.scss';

class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { commit, fullName, id } = this.props;
    return (
      <div className="commit-section">
        <h1 className="commits-section-title">Latest commits {fullName && `on ${fullName}`}</h1>
        {commit &&
          commit.map((item, index) => {
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
