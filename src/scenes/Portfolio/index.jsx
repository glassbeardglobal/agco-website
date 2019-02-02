import React, { Component } from 'react';

import PhotoBlock from 'components/PhotoBlock';

import './styles.scss';

class Portfolio extends Component {
  render() {
    return (
      <div className="portfolio container">
        <div id="portfolio-wrapper">
          <PhotoBlock limit={0} skip={0} />
        </div>
      </div>
    );
  }
}

export default Portfolio;
