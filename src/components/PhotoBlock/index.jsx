import React, { Component } from 'react';

import Photo from 'components/Photo';
import { partitionBlock } from 'utilities/partition';

const PhotoRow = (props) => {
  const { containerWidth, photos } = props;
  const ratios = photos.map(x => {
    const og = x.images[x.images.length-1];
    return og.width / og.height;
  });
  const widthAdjusted = containerWidth - (photos.length * 4);
  const totalRatio = ratios.reduce((a, b) => a + b, 0);
  const scaled = ratios.map(x => Math.floor(widthAdjusted * x / totalRatio));

  return (
    <div className="photo-row">
      { props.photos.map((x, i) => <Photo {...x} imgWidth={scaled[i]} key={x._id} />)}
    </div>
  );
}

class PhotoBlock extends Component {
  render() {
    const { photos, width } = this.props;

    const rows = partitionBlock(photos);

    return (
      <div>
        { rows.map(r => <PhotoRow photos={r} containerWidth={width} key={r[0]._id} />)}
      </div>
    );
  }
}

export default PhotoBlock;
