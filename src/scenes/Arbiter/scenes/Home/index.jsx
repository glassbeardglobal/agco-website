import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';

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
      width: 0,
    };

    this.rightRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      width: this.rightRef.current.clientWidth,
    });
  }

  setPane = (pane) => {
    this.setState({ pane });
  }

  render() {
    const { pane, width } = this.state;

    return (
      <div className="home-wrapper">
        <div className="home container">
          <div className="left">
            <div>
              <Profile />
              <Picker active={pane} setPane={this.setPane} />
            </div>
          </div>
          <div className="right" ref={this.rightRef}>
            <PaneTranstition visible={pane === 0} uid="inventory-pane">
              <Inventory width={width} />
            </PaneTranstition>
            <PaneTranstition visible={pane === 1} uid="history-pane">
              <History />
            </PaneTranstition>
            <PaneTranstition visible={pane === 2} uid="insights-pane">
              <Insights />
            </PaneTranstition>
          </div>
        </div>

        <div className="tabs">
          <Tabs
            value={pane}
            onChange={(_, val) => this.setPane(val)}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<StoreIcon />} />
            <Tab icon={<ReceiptIcon />} />
            <Tab icon={<AssessmentIcon />} />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Home;
