import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from 'components/Nav';
import { DarkTheme, LightTheme } from 'components/Nav/Theme';
import Arbiter from 'scenes/Arbiter';
import Portfolio from 'scenes/Portfolio';
import PhotoView from 'scenes/PhotoView';
import store from 'services/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Nav />

            <div className="views">
              <Route path="/" exact component={LightTheme(Arbiter)} />
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
