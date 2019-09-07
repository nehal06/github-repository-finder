import React, { useState, Fragment } from 'react';

const SearchBar = ({ setAlert, searchRepo, clearuser }) => {
  const [text, setText] = useState('');
  // const [alert,setAlert] = useState(null);
  const [triggerClickType, setTriggerClickType] = useState('search');

  const languages = [
    'c',
    'C++',
    'c#',
    'javascript',
    'java',
    'css',
    'html',
    'python'
  ];
  const fetchSearchData = e => {
    // this.setState({ text: e.target.value });
    setText(e.target.value);
  };
  //search repo
  const searchRecords = () => {
    if (text === '') {
      // this.props.setAlert('Please provide language name for search', 'light');
      setAlert('Please provide language name for search', 'light');
    } else if (!languages.includes(text)) {
      setAlert('Please provide valid language name for search', 'light');
      // this.setState({ text: '' });
      setText('');
    } else if (languages.includes(text)) {
      setTriggerClickType('search');
      searchRepo(text, triggerClickType);
      // this.setState({ text: '' });
      setText('');
    }
  };
  /* on click of language button */
  const searchRecordBtn = e => {
    e.preventDefault();
    console.log(e.target.value);
    // this.setState({ text: e.target.value });
    // this.setState({ triggerClickType: 'button' });
    setTriggerClickType('button');
    searchRepo(e.target.value, triggerClickType);
  };

  const Clearuser = () => {
    clearuser();
  };

  return (
    <Fragment>
      <div className="col s12 m6 l6 input-field">
        <input
          type="text"
          placeholder="Search by language name"
          list="browsers"
          value={text}
          onChange={fetchSearchData}
          style={{ border: '1px solid #e0e0e0' }}
        />

        <datalist id="browsers">
          {languages.map((e, i) => (
            <option key={i} value={e} />
          ))}
        </datalist>
      </div>
      <div className="col s12 m2 l2 input-field">
        <button className="btn" onClick={searchRecords}>
          Search
        </button>
        <button className="btn grey lighten-1 marginLect" onClick={Clearuser}>
          clear
        </button>
      </div>

      <div className="row">
        <div className="col s12">
          {languages.map((e, i) => (
            <button
              className={`btn ${i != 0 ? 'marginLect' : ''} marginBottom`}
              onClick={searchRecordBtn}
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
};

export default SearchBar;
