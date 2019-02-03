import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import PhotoBlock from 'components/PhotoBlock';

class Inventory extends Component {
  render() {
    const { items, width } = this.props;

    let body = null;
    if (items && width > 0) {
      const { byId } = items;
      const photos = [];

      Object.keys(byId).forEach(id => {
        const img = byId[id];
        photos.push(Object.assign({}, img, {
          images: [img.image]
        }));
      });

      body = (
        <PhotoBlock photos={photos} width={width} />
      );
    }

    return (
      <div className="pane inventory">
        { body }
        <Fab color="secondary" aria-label="Add" className="add-icon">
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.data,
});

export default connect(mapStateToProps)(Inventory);
