import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    if (this.props.user) {
      this.setState({
        width: this.rightRef.current.clientWidth,
      });
    }
  }

  filter = (photos) => {
    const { filters, searchDirty, searchQuery } = this.props;
    let res = photos.map(x => Object.assign({}, x));
    if (filters.length !== 0) {
      res = res.filter(p => { return filters.indexOf(p.category) >= 0; });
    }
    if (searchDirty) {
      res = res.filter(p => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().indexOf(q) !== -1 ||
          p.manufacturer.toLowerCase().indexOf(q) !== -1 ||
          p.compatibility.toLowerCase().indexOf(q) !== -1
        );
      });
    }

    return res;
  }

  render() {
    const { items, user } = this.props;
    const { width } = this.state;

    if (!user) {
      return <Redirect to="/" />
    }

    let body = null;
    if (user && items && width > 0) {
      const { byId } = items;
      const { _id } = user;
      const photos = [];

      Object.keys(byId).forEach(id => {
        const img = byId[id];
        if (img.forSale && img.userId !== _id) {
          photos.push(Object.assign({}, img, {
            images: [img.image],
          }));
        }
      });

      const filtered = this.filter(photos);

      body = (
        <PhotoBlock photos={filtered} width={width} disableButtons />
      );
    }

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
  user: state.user.data,
  items: state.item.data,
  filters: state.market.filters,
  searchDirty: state.market.searchDirty,
  searchQuery: state.market.searchQuery,
});

export default connect(mapStateToProps, null)(Market);
