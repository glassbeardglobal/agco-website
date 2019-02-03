import React from 'react';

import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';

const Market = () => (
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

export default Market;
