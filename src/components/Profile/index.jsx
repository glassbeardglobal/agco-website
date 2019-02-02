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
          <h1>Bhangra Distributions LLC</h1>
        </div>

        <div className="info">
          <table>
            <tbody>
              <tr>
                <td>Contact</td>
                <td>Radue Bhangra</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  420 Bhangra Avenue
                  Browntown, Illinois
                  60420
                </td>
              </tr>
              <tr>
                <td>Telephone</td>
                <td>+1 (847) 696-9696</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
