import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import { isAuthenticated, login as apiLogin } from 'services/api/auth';

import Login from './scenes/Login';
import Upload from './scenes/Upload';
import Featured from './scenes/Featured';
import List from './scenes/List';

const Root = withRouter((props) => (
  <ul>
    <li><Link to={`${props.match.url}upload`}>Portfolio Upload</Link></li>
    <li><Link to={`${props.match.url}featured`}>Set Featured</Link></li>
    <li><Link to={`${props.match.url}list`}>Modify Photos</Link></li>
  </ul>
));

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      stable: false,
    }
  }

  componentDidMount() {
    isAuthenticated()
      .then(res => {
        this.setState({ authenticated: res.authenticated, stable: true });
      })
      .catch(() => this.setState({ authenticated: false }));
  }

  login = (username, password) => {
    apiLogin(username, password)
      .then(() => this.setState({ authenticated: true, stable: true }))
      .catch(() => this.setState({ authenticated: false, stable: true }));
  }

  render() {
    const { match } = this.props;
    const { stable, authenticated } = this.state;

    if (!stable) return null;
    if (!authenticated) return <Login login={this.login} />

    return (
      <div className="admin container">
        <Link to="/admin/">Admin Root</Link>
        <Route path={`${match.url}`} exact component={Root} />
        <Route path={`${match.url}upload`} exact component={Upload} />
        <Route path={`${match.url}featured`} exact component={Featured} />
        <Route path={`${match.url}list`} exact component={List} />
      </div>
    );
  }
}

export default Admin;
