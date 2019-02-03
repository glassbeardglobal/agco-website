import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Transition, config, animated } from 'react-spring';

import Nav from 'components/Nav';
import Arbiter from 'scenes/Arbiter';
import Market from 'scenes/Market';
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
    default:
      return null;
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(getItems());
    store.dispatch(getOtherUsers());
    store.dispatch(getTransactions());

    if (process.env.REACT_APP_BYPASS_LOGIN) {
      setTimeout(() => store.dispatch(login('farmer1@gmail.com', 'dockboi')), 300);
    }
  }

  render() {
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
                  >
                    {pathname => style => {
                      const Component = mapRouteToComponent(pathname)
                      return (
                        <animated.div style={{ ...style, position: 'absolute', width: '100vw' }}>
                          <Component />
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
