import React, { Component } from 'react';

import { fetchImages } from 'services/api/image';

import ListElement from './ListElement';
import './styles.scss';

class PhotoBlock extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      photos: [],
    };
  }

  componentDidMount() {
    this.setState({ fetching: true });
    fetchImages()
      .then(d => {
        this.setState({
          fetching: false,
          photos: d.photos,
        });
      })
      .catch(e => {
        this.setState({ fetching: false });
      });
  }

  render() {
    const { fetching, photos } = this.state;

    if (fetching) {
      return null;
    }

    return (
      <div>
        { photos.map(p => <ListElement photo={p} key={p._id} />) }
      </div>
    );
  }
}

export default PhotoBlock;
