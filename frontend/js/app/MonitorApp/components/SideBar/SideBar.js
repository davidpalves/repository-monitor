import React from 'react';

import repository from '../../../../services/repositories'
import Alert from '../Alert/Alert'

import './style.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: "",
      message: "",
      error: false,
    };

    this.ENTER_KEY = 13;

    this.send = this.send.bind(this);
    this.onChange = this.onChange.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);

  }

  onChange(event) {
    const { value } = event.target;
    this.setState({
      repo: value,
      error: false,
    });
  }

  dismissAlert(){
    this.setState({
      error: false
    })
  }

  async send(event) {
    const { repo } = this.state;
    const { getData } = this.props;

    if (event.keyCode === this.ENTER_KEY) {

      event.preventDefault();
      event.target.value = "";

      await repository.postRepository(repo)
        .catch(error => {
            const { data } = error.response

            this.setState({
              error: true,
              message: (data.detail || data[0]),
            });
        });

      getData();
    }

  }

  render() {
    const { message, error } = this.state;

    return (
      <div className="sidebar">
        <Alert
          error={error}
          message={ message }
          dismissAlert={this.dismissAlert}
        />
        <form>
          <label>Search one of yours repositories</label>
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
