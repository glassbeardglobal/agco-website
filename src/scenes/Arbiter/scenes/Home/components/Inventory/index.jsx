import React, { Component } from 'react';
import { connect } from 'react-redux';

import PhotoBlock from 'components/PhotoBlock';

class Inventory extends Component {
  render() {
    const { items, width, userID } = this.props;

    let body = null;
    if (items && width > 0) {
      const { byId } = items;
      const photos = [];

      Object.keys(byId).forEach(id => {
        const img = byId[id];
        if (img.userId === userID) {
          photos.push(Object.assign({}, img, {
            images: [img.image]
          }));
        }
      });

      body = (
        <PhotoBlock photos={photos} width={width} />
      );
    }

    return (
      <div className="pane inventory">
        { body }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.data,
  userID: state.user.data._id,
});

export default connect(mapStateToProps)(Inventory);
