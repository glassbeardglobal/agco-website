import React from 'react';
import { connect } from 'react-redux';
import { search } from 'services/market/actions';

import './styles.scss';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSearch(e) {
    const { search } = this.props;
    search(e.target.value);
  }

  handleFocus(e) {
    const { search, dirty } = this.props;
    if (!dirty) {
      search("", false);
    }
  }

  handleBlur(e) {
    console.log('hi');
    const { search, dirty } = this.props;
    if (!dirty || e.target.value === "") {
      search("Search", false);
    }
  }

  render() {
    const { value, dirty } = this.props;
    return (
      <div className="market-searchbar">
        <input
          type="text"
          value={value}
          onChange={this.handleSearch}
          className={dirty ? "":"initial"}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.market.searchQuery,
  dirty: state.market.searchDirty,
});

const mapDispatchToProps = dispatch => ({
  search: (query, setDirty) => dispatch(search(query, setDirty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
