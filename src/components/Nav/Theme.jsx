import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setNavDark, setNavLight } from 'services/UI/actions';

const Theme = (dark) => (WrappedComponent) => {
  class ThemedComponent extends Component {
    componentDidMount() {
      this.props.setTheme();
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  const mapDispatchToProps = dispatch => ({
    setTheme: () => {
      if (dark) dispatch(setNavDark());
      else dispatch(setNavLight());
    }
  });

  return connect(undefined, mapDispatchToProps)(ThemedComponent);
}

export const DarkTheme = Theme(true);
export const LightTheme = Theme(false);
