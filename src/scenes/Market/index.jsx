import React from 'react';
import { connect } from 'react-redux';

import PhotoBlock from 'components/PhotoBlock';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';

class Market extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 0,
    }

    this.rightRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      width: this.rightRef.current.clientWidth,
    });
  }

  render() {
    const { items } = this.props;
    const { width } = this.state;

    let body = null;
    if (items && width > 0) {
      const { byId } = items;
      const photos = [];

      Object.keys(byId).forEach(id => {
        const img = byId[id];
        if (img.forSale) {
          photos.push(Object.assign({}, img, {
            images: [img.image],
          }));
        }
      });

      body = (
        <PhotoBlock photos={photos} width={width} disableButtons />
      );
    }

    console.log(items);

    return (
      <div className="home-wrapper">
        <div className="home container">
          <div className="left">
            <Sidebar />
          </div>
          <div className="right" ref={this.rightRef}>
            <Searchbar />
            { body }
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  items: state.item.data,
});

export default connect(mapStateToProps, null)(Market);
