import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Nav from 'components/Nav';
import { DarkTheme, LightTheme } from 'components/Nav/Theme';
import Home from 'scenes/Home';
import Portfolio from 'scenes/Portfolio';
import PhotoView from 'scenes/PhotoView';
import Admin from 'scenes/Admin';
import store from 'services/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Nav />

            <div className="views">
              <Route path="/" exact component={LightTheme(Home)} />
              <Route path="/portfolio" exact component={LightTheme(Portfolio)} />
              <Route path="/view/:id" component={DarkTheme(PhotoView)} />
              <Route path="/admin" strict exact component={() => <Redirect to="/admin/" />} />
              <Route path="/admin/" strict component={Admin} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
