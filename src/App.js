import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Transition, config, animated } from 'react-spring';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Nav from 'components/Nav';
import Arbiter from 'scenes/Arbiter';
import Market from 'scenes/Market';
import ItemUpload from 'scenes/ItemUpload';
import store from 'services/store';
import { getItems } from 'services/item/actions';
import { getUsers as getOtherUsers } from 'services/otherUsers/actions';
import { getTransactions } from 'services/transaction/actions';
import { login } from 'services/user/actions';
import { setPane } from 'services/UI/actions';

const mapRouteToComponent = (pathname) => {
  switch (pathname) {
    case "/":
      return Arbiter;
    case "/market":
      return Market;
    case "/upload":
      return ItemUpload;
    default:
      return null;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rested: {},
    }

    this.handleRest = this.handleRest.bind(this);
  }

  componentDidMount() {
    store.dispatch(getItems());
    store.dispatch(getOtherUsers());
    store.dispatch(getTransactions());

    if (process.env.REACT_APP_BYPASS_LOGIN) {
      setTimeout(() => store.dispatch(login('bigdock2@gmail.com', 'boithedock')), 300);
    }
  }

  handleRest(pathname) {
    const { rested } = this.state;
    this.setState({ rested: { ...rested, [pathname]: true }});
  }

  render() {
    const { pane, setPane } = this.props;
    const { rested } = this.state;

    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div>
              <Nav />
              <div className="views">
                <Transition
                  config={config.fast}
                  items={location.pathname}
                  initial
                  from={{ opacity: 0, transform: 'scale3d(0.5,0.5,0.5)' }}
                  enter={{ opacity: 1, transform: 'scale3d(1,1,1)' }}
                  leave={{ opacity: 0, transform: 'scale3d(0.5,0.5,0.5)' }}
                  onRest={(pathname) => {
                    this.handleRest(pathname);
                  }}
                >
                  {pathname => style => {
                    const Component = mapRouteToComponent(pathname)
                    return (
                      <animated.div style={{ ...style, position: 'absolute', width: '100vw', minHeight: '100%' }}>
                        <Component rested={rested[pathname]} />
                      </animated.div>
                    )
                  }}
                </Transition>
              </div>

              { console.log(location) }

              { location.pathname === "/" &&
                <div className="tabs">
                  <Tabs
                    value={pane}
                    onChange={(_, val) => setPane(val)}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab icon={<StoreIcon />} />
                    <Tab icon={<ReceiptIcon />} />
                    <Tab icon={<AssessmentIcon />} />
                  </Tabs>
                </div>
              }

              { location.pathname === "/" && pane === 0 &&
                <Fab color="secondary" aria-label="Add" className="add-icon">
                  <Link to="/upload">
                    <AddIcon />
                  </Link>
                </Fab>
              }
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  pane: state.ui.pane,
});
const mapDispatchToProps = dispatch => ({
  setPane: pane => dispatch(setPane(pane)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
