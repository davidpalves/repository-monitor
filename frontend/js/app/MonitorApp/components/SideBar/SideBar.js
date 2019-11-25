import React from 'react';

import './style.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="sidebar">
        <form>
          <label>Search a new repository</label>
          <input type='text' placeholder='User/Repository'/>
        </form>
      </div>
    );
  }
}

export default SideBar;
