import React, { Component } from 'react';

import radue from 'assets/images/radue.jpg';

import './styles.scss';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-image">
          <img src={radue} alt="Radue" />
        </div>

        <div className="name">
          <h1>Radue Bhangra</h1>
        </div>
      </div>
    );
  }
}

export default Profile;
