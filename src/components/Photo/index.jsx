import React, { Component } from 'react';

import './styles.scss';

class Photo extends Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  onLoad = () => { this.setState({ loaded: true }) }

  render() {
    const { images, imgWidth, name, onClick } = this.props;
    const { loaded } = this.state;
    const og = images[images.length - 1];

    const srcset = images.map(i => `${i.url} ${i.width}w`);

    return (
      <div
        className={`photo ${loaded ? 'ready' : 'loading'}`}
        style={{ width: imgWidth }}
        onClick={onClick}
      >
        <img
          src={og.url}
          srcSet={srcset.join(', ')}
          sizes={`${imgWidth}px`}
          onLoad={this.onLoad}
          alt={name}
        />
        <div className="description"><p>{name}</p></div>
      </div>
    );
  }
}

export default Photo;
