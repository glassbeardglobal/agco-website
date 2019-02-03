import React, { Component } from 'react';

import './styles.scss';

const paneNames = ['Inventory', 'History', 'Insights'];

class Picker extends Component {
  setActive = (pane) => () => {
    const { setPane } = this.props;
    setPane(pane);
  }

  render() {
    const { active } = this.props;
    const items = paneNames.map((p, i) => (
      <div
        className={`item ${active === i ? 'active' : 'inactive'}`}
        onClick={this.setActive(i)}
        key={`lol-${i}`}
      >
        <p>{p}</p>
      </div>
    ));

    return (
      <div className="picker">
        { items }
      </div>
    );
  }
}

export default Picker;
