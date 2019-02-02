import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import arrow_back from 'assets/arrow_back.svg';
import { fetchImageById } from 'services/api/image';

import './styles.scss';

class PhotoView extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      imageData: null,
      imageLoaded: false,
      next: null,
      prev: null,
    };
  }

  componentDidMount() {
    this.fetchImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ imageLoaded: false });
      setTimeout(this.fetchImage, 220);
    }
  }

  fetchImage = () => {
    fetchImageById(this.props.match.params.id)
      .then(data => this.setState({
        fetching: false,
        imageData: data.photo,
        next: data.next,
        prev: data.prev,
      }))
      .catch(err => this.setState({ fetching: false }));
  }

  handleLoad = () => {
    this.setState({
      imageLoaded: true,
    });
  }

  render() {
    const { imageData, fetching, prev, next, imageLoaded } = this.state;

    if (fetching || imageData === null) {
      return <div className="photo-view"><div className="photo loading" /></div>;
    }

    const { images, location, description } = imageData;
    const og = images[images.length - 1];
    const aspectRatio = og.height / og.width;
    const browserAspect = window.innerHeight / window.innerWidth;

    let delimiter = null;
    if (location && description) { delimiter = " | "; }

    // These are derived directly from CSS rules for computing max-width/max-height
    let size = '90vw';
    if (aspectRatio > browserAspect) {
      size = `${(window.innerHeight - 100) / aspectRatio}px`;
    }
    
    const srcset = images.map(i => `${i.url} ${i.width}w`);
    return (
      <div className="photo-view">
        <div className={`photo ${imageLoaded ? 'ready' : 'loading'}`}>
          <img
            src={images[images.length-1].url}
            srcSet={srcset.join(', ')}
            sizes={size}
            alt={imageData.title}
            onLoad={this.handleLoad}
          />

          { (location || description) &&
            <div className="description">
              <p><strong>{location}</strong>{delimiter}{description}</p>
            </div>
          }
        </div>

        { prev &&
          <Link to={`/view/${prev}`}  className="arrow arrow-back">
            <img src={arrow_back} alt="Navigate back" />
          </Link>
        }
        { next &&
          <Link to={`/view/${next}`}  className="arrow arrow-forward">
            <img src={arrow_back} alt="Navigate forward" />
          </Link>
        }
      </div>
    );
  }
}

export default PhotoView;
