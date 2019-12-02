import React from 'react';
import { withRouter } from 'react-router-dom'

import repository from '../../../../services/repositories'
import Alert from '../Alert/Alert'

import './style.scss'

class WelcomeSession extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      repo: "",
      redirect: false,
      error: false,
      message: "",
    };

    this.ENTER_KEY = 13;

    this.send = this.send.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({
      repo: value,
    });
  }

  async onClick(event) {
    const { repo } = this.state;

    event.preventDefault();

    await repository.postRepository(repo)
    .then(() => {
      this.setState({ redirect: true });
    })
    .catch(error => {
      const { data } = error.response

      this.setState({
        error: true,
        message: (data.detail || data[0]),
      })
    });

    const { redirect, error } = this.state;
    if(redirect && !error) history.push('/commits');
  }

  async send(event) {
    const { repo } = this.state;
    const { history } = this.props;

    if (event.keyCode === this.ENTER_KEY) {
      event.preventDefault();
      await repository.postRepository(repo)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        const { data } = error.response

        this.setState({
          error: true,
          message: (data.detail || data[0]),
        })
      });

      const { redirect, error } = this.state;
      if(redirect && !error) history.push('/commits');
    }
  }

  handleDismissAlert(){
    this.setState({
      error: false
    })
  }

  render() {
    const { message, error } = this.state;

    return (
      <div className="welcome-session">
        <Alert
          error={error}
          message={ message }
          handleDismissAlert={this.handleDismissAlert}
        />

        <h1>Watch your repositories commits easily</h1>
        <form>
          <label>Search one of yours repositories</label>
          <div className="search-form">
            <input
              type='text'
              placeholder='User/Repository'
              onChange={this.onChange}
              onKeyDown={this.send}
              />
              <button onClick={this.onClick}>Go!</button>
            </div>
        </form>
      </div>
    );
  }
};

export default withRouter(WelcomeSession);
