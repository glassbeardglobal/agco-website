import React, { Component } from 'react';

import Column from 'components/Column';
import { fetchFeatured } from 'services/api/featured';

import './styles.scss';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      fetching: true,
      featured: null,
    };
  }

  componentDidMount() {
    this.setState({ fetching: true });
    fetchFeatured()
      .then(x => {
        this.setState({ featured: x, fetching: false });
      })
      .catch(err => {
        this.setState({ featured: null, fetching: false });
      });
  }

  render() {
    const { fetching, featured } = this.state;
    const columns = [];

    if (!fetching && featured !== null) {
      featured.forEach(f => {
        columns.push(<Column url={f.url} to={f.ref} key={f._id} />);
      });
    }

    return (
      <div className="home">
        <div className="center-text">
          <h1>Evan Lissoos</h1>
        </div>

        <div className="columns">
          { columns }
        </div>
      </div>
    );
  }
}

export default Home;
