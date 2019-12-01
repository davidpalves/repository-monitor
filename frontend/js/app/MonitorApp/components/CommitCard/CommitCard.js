import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

class CommitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { fullName, item, id } = this.props;
    return (
      <div className="commit-card">
        <div className="title-section">
          <h4 className="repo-name">
            {<Link to={`/repository/${id}`}>{item.repository.full_name || fullName}</Link>}
          </h4>
          <span className="sha">SHA: {item.sha}</span>
        </div>
        <p className="commit-message">{item.message}</p>
        <p className="commit-author">
          {item.author && item.author.name} commited on {item.date}
        </p>
        <small>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            See changes
          </a>
        </small>
      </div>
    );
  }
}

export default CommitCard;
