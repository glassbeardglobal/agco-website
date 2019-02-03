import React, { Component } from 'react';

import Profile from 'components/Profile';

import History from './components/History';
import Insights from './components/Insights';
import Inventory from './components/Inventory';
import Picker from './components/Picker';
import PaneTranstition from './components/PaneTransition';
import './styles.scss';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      pane: 0,
    };
  }

  setPane = (pane) => {
    this.setState({ pane });
  }

  render() {
    const { pane } = this.state;

    return (
      <div className="home container">
        <div className="left">
          <Profile />
          <Picker active={pane} setPane={this.setPane} />
        </div>
        <div className="right">
          <PaneTranstition visible={pane === 0} uid="inventory-pane">
            <Inventory />
          </PaneTranstition>
          <PaneTranstition visible={pane === 1} uid="history-pane">
            <History />
          </PaneTranstition>
          <PaneTranstition visible={pane === 2} uid="insights-pane">
            <Insights />
          </PaneTranstition>
        </div>
      </div>
    );
  }
}

export default Home;
