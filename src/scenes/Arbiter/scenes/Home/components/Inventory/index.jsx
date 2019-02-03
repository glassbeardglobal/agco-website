import React, { Component } from 'react';
import { connect } from 'react-redux';

import PhotoBlock from 'components/PhotoBlock';

class Inventory extends Component {
  render() {
    const { items } = this.props;

    let body = null;
    if (items) {
      const { byId } = items;
      body = (
        <h1>Loaded Bitch</h1>
      );
    }

    return (
      <div className="pane inventory">
        <h1>Inventory</h1>
        { body }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.data,
});

export default connect(mapStateToProps)(Inventory);
