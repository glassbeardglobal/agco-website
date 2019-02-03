import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './scenes/Login';
import Home from './scenes/Home';

class Arbiter extends Component {
  render() {
    const { user } = this.props;

    console.log(user)

    if (user === null) {
      return <Login />;
    } else {
      return <Home />;
    }
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(Arbiter);
