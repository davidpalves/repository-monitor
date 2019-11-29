import React from 'react';
import { Redirect } from 'react-router-dom'

import repository from '../../../../services/repositories'

import './style.scss'

class WelcomeSession extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      repo: "",
      redirect: false,
    };

    this.ENTER_KEY = 13;

    this.send = this.send.bind(this);
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
    event.target.value = "";
    await repository.postRepository(repo)
      .catch(error => {
          const { data } = error.response
          alert(data.detail || data[0])
      });

    this.setState({
      redirect: true
    });

  }

  async send(event) {
    const { repo } = this.state;

    if (event.keyCode === this.ENTER_KEY) {
      event.preventDefault();
      event.target.value = "";
      await repository.postRepository(repo)
        .catch(error => {
            const { data } = error.response
            alert(data.detail || data[0])
        });

      this.setState({
        redirect: true
      });
      }
    }

    render() {
      const { redirect } = this.state;
      if(redirect) {
        return <Redirect to='/commits' />
      } else {
        return (
          <div className="welcome-session">
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
  }
};

export default WelcomeSession;
