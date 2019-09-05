import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ item: { id, name, owner, language, html_url, forks } }) => {
  return (
    <div className="card">
      <div className="card-content row">
        <div className="col s4">
          <img
            src={owner.avatar_url}
            className="circle"
            height="80px"
            width="80px"
          />
        </div>
        <div className="col s8">
          <h5>
            {/*  <a href={owner.html_url} target="_blank">
              {owner.login}
            </a> */}
            <Link to={`/user/${owner.login}`}>{owner.login}</Link>
          </h5>
          <h6 className="black-text teal-text">{name}</h6>
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
    </div>
  );
};

export default UserItem;
