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
      height: 0,
    };
  }

  render() {
    const { containerWidth, photos, items, disableButtons, id } = this.props;
    const { active, close, height } = this.state;
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
                setTimeout(() => {
                  const x = document.querySelector(`#${id}`);
                  this.setState({ height: x.offsetHeight });
                }, 100);
                this.setState({ active: x._id });
              }
            }}
          />
        ))}

        <div className={active && !close ? 'info active' : 'info inactive'} style={{ height: active && !close ? height : 0 }}>
          <Info data={data} disableButtons={disableButtons} onClose={() => {
            this.setState({ close: true });
            setTimeout(() => this.setState({ active: null, close: false }), 420);
          }} id={id} />
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

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class PhotoBlock extends Component {
  render() {
    const { photos, width, disableButtons } = this.props;
    const rows = partitionBlock(photos, width < 500);

    return (
      <div>
        { rows.map(r => <PR photos={r} containerWidth={width} key={r[0]._id} disableButtons={disableButtons} id={makeid()} />)}
      </div>
    );
  }
}

export default PhotoBlock;
