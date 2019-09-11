import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/users/User';
import SearchBar from './components/Search/SearchBar';
import Alert from './components/layout/Alert';
import blobShape from './components/layout/blob-shape.svg';
import Pagination from './components/layout/Pagination';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertContext from './context/alert/AlertState';

const App = () => {
  /* using promise and then */
  // componentDidMount() {
  //   axios
  //     .get(
  //       'https://api.github.com/search/repositories?q=c+language:assembly&sort=forks&order=desc&page=1&per_page=10'
  //     )
  //     .then(res => console.log(res.data))
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  /* using async await */
  // async componentDidMount() {
  //   try {
  //     const res = await axios.get(
  //       `https://api.github.com/search/repositories?q=language%3Ac%2B%2B&sort=forks&order=desc&page=1&per_page=10&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     console.log(res.data);
  //     this.setState({
  //       items: res.data.items,
  //       totalCount: res.total_Count
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <GithubState>
      <AlertContext>
        <Router>
          <div className="App">
            <Navbar name="Github finder" />
            <div
              className="bigBlobContainer"
              /*  style={{
            position: 'fixed',
            top: '-40%',
            right: '-5%',
            zIndex: '-1'
          }} */
            >
              <img src={blobShape} className="blobBigImg" />
            </div>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <div className="row" style={{ marginLeft: '5.5%' }}>
                      <Alert />
                    </div>
                    <div className="row" style={{ marginLeft: '5%' }}>
                      <SearchBar />
                    </div>

                    <User />

                    <Pagination />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => <UserProfile {...props} />}
              />
            </Switch>
            <div
              className="smallBlobContainer"
              /* style={{
            position: 'fixed',
            bottom: '-0%',
            left: '-20%',
            zIndex: '-1'
          }} */
            >
              <img src={blobShape} className="blobSmallImg" />
            </div>
          </div>
        </Router>
      </AlertContext>
    </GithubState>
  );
};

export default App;
