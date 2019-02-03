import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import './styles.scss';

class Profile extends Component {
  render() {
    const { userDict, userId } = this.props;

    if (!userId) {
      return null;
    }

    const user = userDict[userId];
    return (
      <div className="profile">
        <div className="profile-image">
          <img src={user.image} alt="Radue" />
        </div>

        <div className="name">
          <h1>{user.name}</h1>
        </div>

        <div className="info">
          <table>
            <tbody>
              <tr>
                <td>Contact</td>
                <td>{user.contact}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td>Telephone</td>
                <td>{user.telephone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDict: state.otherUsers.data.byId,
});

export default connect(mapStateToProps, null)(Profile);
