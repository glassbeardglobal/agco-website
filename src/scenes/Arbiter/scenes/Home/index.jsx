import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from 'components/Profile';
import { setPane } from 'services/UI/actions';

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
      width: 0,
    };

    this.rightRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      width: this.rightRef.current.clientWidth,
    });
  }

  render() {
    const { width } = this.state;
    const { pane, userId, setPane } = this.props;

    return (
      <div className="home-wrapper">
        <div className="home container">
          <div className="left">
            <div>
              <Profile userId={userId}/>
              <Picker active={pane} setPane={setPane} />
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
              <Insights visible={pane === 2}/>
            </PaneTranstition>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.data._id,
  pane: state.ui.pane,
});
const mapDispatchToProps = dispatch => ({
  setPane: pane => dispatch(setPane(pane)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
