import React from 'react';
import { connect } from 'react-redux';
import { addFilter, removeFilter } from 'services/market/actions';

import './styles.scss';

const filterOptions = ['Big', 'Little', 'Dock-ready'];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleFilter = this.handleToggleFilter.bind(this);
  }

  handleToggleFilter(e, filter) {
    const { mark, unmark } = this.props;
    if (e.target.checked) {
      mark(filter);
    } else {
      unmark(filter);
    }
  }

  render() {
    return (
      <div className="market-sidebar">
        {
          filterOptions.map(filter => (
            <div className="filter-option">
              <span>{filter}</span>
              <input
                type="checkbox"
                name={filter}
                value="Bike"
                onChange={e => this.handleToggleFilter(e, filter)}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  mark: filter => dispatch(addFilter(filter)),
  unmark: filter => dispatch(removeFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Sidebar);
