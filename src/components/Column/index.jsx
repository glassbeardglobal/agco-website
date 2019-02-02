import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

class Column extends Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  handleLoad = () => {
    setTimeout(() => this.setState({ loaded: true }), Math.random() * 200);
  }

  render() {
    const { url, to } = this.props;
    const { loaded } = this.state;
    const style = {
      backgroundImage: `url("${url}")`,
    };
    return (
      <Link
        className={`column ${loaded ? 'ready' : 'loading'}`}
        style={style}
        to={`view/${to}`}
      >
        <img src={url} alt="IGNORE" onLoad={this.handleLoad} />
      </Link>
    );
  }
}

export default Column;
