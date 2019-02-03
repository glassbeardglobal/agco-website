import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from 'components/Nav';
import { DarkTheme, LightTheme } from 'components/Nav/Theme';
import Arbiter from 'scenes/Arbiter';
import Market from 'scenes/Market';
import Portfolio from 'scenes/Portfolio';
import PhotoView from 'scenes/PhotoView';
import store from 'services/store';
import { getItems } from 'services/item/actions';
import { getUsers as getOtherUsers } from 'services/otherUsers/actions';
import { login} from 'services/user/actions';

class App extends Component {
  componentDidMount() {
    store.dispatch(getItems());
    store.dispatch(getOtherUsers());

    if (process.env.REACT_APP_BYPASS_LOGIN) {
      setTimeout(() => store.dispatch(login('farmer1@gmail.com', 'dockboi')), 300);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Nav />

            <div className="views">
              <Route path="/" exact component={LightTheme(Arbiter)} />
              <Route path="/market" exact component={LightTheme(Market)} />
              <Route path="/portfolio" exact component={LightTheme(Portfolio)} />
              <Route path="/view/:id" component={DarkTheme(PhotoView)} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
