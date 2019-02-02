import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';

import './styles.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = { top: true };
  }
  componentDidMount() {
    window.onscroll = () => {
      this.setState({ top: window.pageYOffset === 0 });
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    const { navDark } = this.props;
    const { top } = this.state;

    return (
      <nav className={`navbar ${top ? 'top' : 'scrolled'} ${navDark ? 'dark' : 'light'}`}>
        <div className="logo">
          <Link to="/">
            <h3>Evan <span>Lissoos</span></h3>
          </Link>
        </div>
        <NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navDark: state.ui.navDark,
});

export default withRouter(connect(mapStateToProps)(Nav));
