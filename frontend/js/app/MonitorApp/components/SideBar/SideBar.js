import React from 'react';
import repository from '../../../../services/commits'

import './style.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: ""
    };

    this.ENTER_KEY = 13;

    this.send = this.send.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({
      repo: value,
    });
  }

  async send(event) {
    const { repo } = this.state;
    
    if (event.keyCode === this.ENTER_KEY) {
      event.preventDefault();
      await repository.postRepository(repo);
    }
    
  }
  
  render() {
    return (
      <div className="sidebar">
        <form>
          <label>Search a new repository</label>
          <input
            type='text'
            placeholder='User/Repository'
            onChange={this.onChange}
            onKeyDown={this.send}
            />
        </form>
      </div>
    );
  }
}

export default SideBar;
