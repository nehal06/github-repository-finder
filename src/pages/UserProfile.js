import React, { Fragment, useEffect, useContext } from 'react';
import './UserProfile.css';
import GithubContext from '../context/github/githubContext';

const UserProfile = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getSingleUser } = githubContext;
  useEffect(() => {
    console.log('componentDidMount');
    getSingleUser(match.params.login);
  }, []);

  console.log(user);
  const { avatar_url, html_url, login, type, bio, public_repos } = user;
  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="profileImageContainer">
            {<img src={avatar_url} alt="" className="circle profileImage" />}
          </div>
          <div className="col s12 center">
            <h3 className="loginText">{login}</h3>
            <h6 className="grey-text">{type}</h6>
          </div>
          {bio && (
            <div className="col s10 m10 l10 offset-s1 offset-l1 offset-m1 center">
              <h6>{bio}</h6>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col s12 center">
            <br />
            <br />
            Public Repositories
            <div className="chip repo"> {public_repos}</div>
            <a className="btn viewProfile" href={html_url} target="_blank">
              View Profile{' '}
              <i className="material-icons right arrow">arrow_forward</i>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
