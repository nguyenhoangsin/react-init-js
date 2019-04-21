import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { getTokenUser } from '../../redux/auth/actions';
import ChangeLanguage from '../components/ChangeLanguage';

class Login extends PureComponent {
  static propTypes = {
    _getTokenUser: func,
  }

  state = {
    username: '',
    password: '',
  }

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSignin = () => {
    const { _getTokenUser } = this.props;
    const { username, password } = this.state;

    _getTokenUser({ username, password });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <ChangeLanguage />
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={this.handleChangeUsername}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={this.handleChangePassword}
        />
        <Button onClick={this.handleSignin}>Signin</Button>
      </div>
    );
  }
}

const mapDispatch = {
  _getTokenUser: getTokenUser,
};

export default connect(null, mapDispatch)(Login);
