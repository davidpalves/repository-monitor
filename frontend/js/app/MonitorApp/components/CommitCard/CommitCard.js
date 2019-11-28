import React from 'react';

import './style.scss'

class CommitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: {},
      repository: {},
    };
  }

  render() {
    const { commit } = this.props;
    return (
      <div className="commit-section">
        <h1 className="commits-section-title">Latest commits</h1>
          {
              commit && commit.map(( item, key ) => {
                  return (
                    <div className='commit-card'>
                      <h4>{ item.repository.full_name }</h4>
                      <p>{ item.message }</p>
                      <p>{ item.author ? item.author.name : "" } commited on { item.date }</p>
                      <small>
                        <a href={ item.url } target="_blank"
                        rel="noopener noreferrer">
                          { item.sha }
                        </a>
                      </small>
                    </div>
                  )
              })
          }
      </div>
    );
  }
}

export default CommitCard;
