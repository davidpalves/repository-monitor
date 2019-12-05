import React from 'react';

import repository from '../../../../services/repositories'
import Alert from '../Alert/Alert'

import '../../../../../sass/components/sidebar.scss';

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
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  onChange(event) {
    const { value } = event.target;
    this.setState({
      repo: value,
      error: false,
    });
  }

  handleDismissAlert(){
    this.setState({
      error: false
    })
  }

  async onClick(event) {
    const { repo } = this.state;
    const { getData } = this.props;

    event.preventDefault();
    event.target.value = "";

    await repository.postRepository(repo).then(() => {
      getData();
    })
      .catch(error => {
          const { data } = error.response

          this.setState({
            error: true,
            message: (data.detail || data[0]),
          });
      });
  }

  async send(event) {
    const { repo } = this.state;
    const { getData } = this.props;

    if (event.keyCode === this.ENTER_KEY) {

      event.preventDefault();
      event.target.value = "";

      await repository.postRepository(repo).then(() => {
        getData();
      })
        .catch(error => {
            const { data } = error.response

            this.setState({
              error: true,
              message: (data.detail || data[0]),
            });
        });
    }
  }

  render() {
    const { message, error } = this.state;

    return (
      <div className="sidebar">
        <Alert
          error={error}
          message={ message }
          handleDismissAlert={this.handleDismissAlert}
        />
        <form>
          <label>Search one of yours repositories</label>
          <input
            type='text'
            placeholder='User/Repository'
            onChange={this.onChange}
            onKeyDown={this.send}
            />
          <button className="search-button" onClick={this.onClick}>Go!</button>
        </form>
      </div>
    );
  }
}

export default SideBar;
