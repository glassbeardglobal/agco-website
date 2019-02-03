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
    const { navDark, user } = this.props;
    const { top } = this.state;

    if (!user) {
      return null;
    }

    return (
      <nav className={`navbar ${top ? 'top' : 'scrolled'} ${navDark ? 'dark' : 'light'}`}>
        <div className="logo">
          <Link to="/">
            <h3>The <span>Harvest</span></h3>
          </Link>
        </div>
        <NavLink exact to="/" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/market" activeClassName="active">Market</NavLink>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navDark: state.ui.navDark,
  user: state.user.data,
});

export default withRouter(connect(mapStateToProps)(Nav));
