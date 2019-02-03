import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';

class Market extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <div className="home container">
          <div className="left">
            <Sidebar />
          </div>
          <div className="right">
            <Searchbar />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, null)(Market);
