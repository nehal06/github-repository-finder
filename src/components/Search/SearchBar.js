import React, { Component, Fragment } from 'react';

class SearchBar extends Component {
  state = {
    text: '',
    languages: [
      'c',
      'C++',
      'c#',
      'javascript',
      'java',
      'css',
      'html',
      'python'
    ],
    alert: null,
    triggerClickType: 'search'
  };

  fetchSearchData = e => {
    this.setState({ text: e.target.value });
  };
  //search repo
  searchRecords = () => {
    if (this.state.text === '') {
      this.props.setAlert('Please provide language name for search', 'light');
    } else if (!this.state.languages.includes(this.state.text)) {
      this.props.setAlert(
        'Please provide valid language name for search',
        'light'
      );
      this.setState({ text: '' });
    } else if (this.state.languages.includes(this.state.text)) {
      this.setState({ triggerClickType: 'search' });
      this.props.searchRepo(this.state.text, this.state.triggerClickType);
      this.setState({ text: '' });
    }
  };

  searchRecordBtn = e => {
    e.preventDefault();
    console.log(e.target.value);
    // this.setState({ text: e.target.value });
    this.setState({ triggerClickType: 'button' });
    this.props.searchRepo(e.target.value, this.state.triggerClickType);
  };

  Clearuser = () => {
    this.props.clearuser();
  };
  render() {
    return (
      <Fragment>
        <div className="col s12 m6 l6 input-field">
          <input
            type="text"
            placeholder="Search"
            list="browsers"
            value={this.state.text}
            onChange={this.fetchSearchData}
          />

          <datalist id="browsers">
            {this.state.languages.map((e, i) => (
              <option key={i} value={e} />
            ))}
          </datalist>
        </div>
        <div className="col s12 m2 l2 input-field">
          <button className="btn" onClick={this.searchRecords}>
            Search
          </button>
          <button
            className="btn grey lighten-1 marginLect"
            onClick={this.Clearuser}
          >
            clear
          </button>
        </div>

        <div className="row">
          <div className="col s12">
            {this.state.languages.map((e, i) => (
              <button
                className="btn marginLect"
                onClick={this.searchRecordBtn.bind(this)}
                key={`btn${i}`}
                value={e}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SearchBar;
