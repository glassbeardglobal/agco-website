import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

class Photo extends Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  onLoad = () => { this.setState({ loaded: true }) }

  render() {
    const { images, imgWidth, _id, title } = this.props;
    const { loaded } = this.state;
    const og = images[images.length - 1];

    const srcset = images.map(i => `${i.url} ${i.width}w`);

    return (
      <Link
        to={`/view/${_id}`}
        className={`photo ${loaded ? 'ready' : 'loading'}`}
        style={{ width: imgWidth }}
      >
        <img
          src={og.url}
          srcSet={srcset.join(', ')}
          sizes={`${imgWidth}px`}
          onLoad={this.onLoad}
          alt={title}
        />
      </Link>
    );
  }
}

export default Photo;
