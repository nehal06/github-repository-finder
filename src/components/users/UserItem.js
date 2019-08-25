import React from 'react';

const UserItem = ({ item: { id, name, owner, language, html_url, forks } }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h5 className="black-text">{name}</h5>
        <br />
        <a
          className="btn-floating halfway-fab btn-large red hoverEffect"
          target="_blank"
          href={html_url}
        >
          <i className="material-icons left">keyboard_arrow_right</i>View More
        </a>

        <div className="chip cyan lighten-4 left">
          <i className="material-icons left">call_split</i> {forks}
        </div>
        <div className="chip orange lighten-3">{language}</div>
      </div>
    </div>
  );
};

export default UserItem;
