import React from 'react';
import CommitCard from './CommitCard';

import './style.scss'

class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { commit, full_name, id } = this.props;
    return (
      <div className="commit-section">
        <h1 className="commits-section-title">
          Latest commits { full_name && `on ${full_name}`}
        </h1>
          {
            commit && commit.map(( item, index ) => {
                return (
                  <CommitCard
                    item={item}
                    key={index}
                    full_name={full_name}
                    id={item.repository.id || id}
                  />
                )
            })
          }
      </div>
    );
  }
}

export default CommitList;
