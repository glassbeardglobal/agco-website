import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Transition, config, animated } from 'react-spring';

import Nav from 'components/Nav';
import Arbiter from 'scenes/Arbiter';
import Market from 'scenes/Market';
import ItemUpload from 'scenes/ItemUpload';
import store from 'services/store';
import { getItems } from 'services/item/actions';
import { getUsers as getOtherUsers } from 'services/otherUsers/actions';
import { getTransactions } from 'services/transaction/actions';
import { login} from 'services/user/actions';

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
    const { rested } = this.state;
    return (
      <Provider store={store}>
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
                          <Component rested={rested[pathname]}/>
                        </animated.div>
                      )
                    }}
                  </Transition>
                </div>
              </div>
            )}
          />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
