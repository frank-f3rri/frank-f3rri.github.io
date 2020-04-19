import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/no-unused-state
    this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ searchterm: event.target.value });
    this.props.onSearchChange(event.target.value);
  }

  search(text) {
    return (<SearchBar onSearchChange={this.search} />);
  }

  render() {
    return (
      <div id="search-bar">
        <input onChange={this.onInputChange} value={this.state.searchterm} />
      </div>
    );
  }
}

export default SearchBar;
