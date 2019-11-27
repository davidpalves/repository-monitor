import React from 'react';

import './style.scss'

class CommitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { commit } = this.props;
    console.log(this.props);
    return (
      <div className="commit-card">
          {
              commit && commit.map(( item ) => {
                  return (<p>{ item.message }</p> )
              })
          }
      </div>
    );
  }
}

export default CommitCard;
