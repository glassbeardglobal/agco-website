import React, { Component } from 'react';

import Profile from 'components/Profile';

import './styles.scss';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      fetching: true,
      featured: null,
    };
  }

  render() {
    return (
      <div className="home container">
        <Profile />
      </div>
    );
  }
}

export default Home;
