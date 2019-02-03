import React, { Component } from 'react';
import { connect } from 'react-redux';

import Photo from 'components/Photo';
import Info from 'components/Info';
import { partitionBlock } from 'utilities/partition';

import './styles.scss';

class PhotoRow extends Component {
  constructor() {
    super();

    this.state = {
      active: null,
      close: false,
    };
  }

  render() {
    const { containerWidth, photos, items } = this.props;
    const { active, close } = this.state;
    const ratios = photos.map(x => {
      const og = x.images[x.images.length-1];
      return og.width / og.height;
    });
    const widthAdjusted = containerWidth - (photos.length * 4);
    const totalRatio = ratios.reduce((a, b) => a + b, 0);
    const scaled = ratios.map(x => Math.floor(widthAdjusted * x / totalRatio));

    let data = null;
    if (active) {
      data = items.byId[active];
    }

    return (
      <div className="photo-row">
        { photos.map((x, i) => (
          <Photo
            {...x}
            imgWidth={scaled[i]}
            key={x._id}
            onClick={() => {
              if (active === x._id) {
                this.setState({ active: null });
              } else {
                this.setState({ active: x._id });
              }
            }}
          />
        ))}

        <div className={active && !close ? 'info active' : 'info inactive'}>
          <Info data={data} onClose={() => {
            this.setState({ close: true });
            setTimeout(() => this.setState({ active: null, close: false }), 420);
          }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.data,
});
const mapDispatchToProps = dispatch => ({
});

const PR = connect(mapStateToProps, mapDispatchToProps)(PhotoRow);

class PhotoBlock extends Component {
  render() {
    const { photos, width } = this.props;
    const rows = partitionBlock(photos, width < 500);

    return (
      <div>
        { rows.map(r => <PR photos={r} containerWidth={width} key={r[0]._id} />)}
      </div>
    );
  }
}

export default PhotoBlock;
