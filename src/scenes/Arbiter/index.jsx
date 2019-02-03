import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './scenes/Login';
import Home from './scenes/Home';

class Arbiter extends Component {
  render() {
    const { user } = this.props;

<<<<<<< HEAD
    console.log(user)

    if (user === null) {
=======
    if (user !== null) {
>>>>>>> a1d9007c46f6d2967a1573e0f5fd56034dcca6cb
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
