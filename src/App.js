import React, { Fragment, useState } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import User from './components/users/User';
import SearchBar from './components/Search/SearchBar';
import ReactPaginate from 'react-paginate';
import Alert from './components/layout/Alert';
import blobShape from './components/layout/blob-shape.svg';
import axios from 'axios';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});

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

  const searchRepo = async (text, languages) => {
    console.log(text);
    console.log(languages);
    console.log(`first load search repo : ${currentLanguage}`);
    // this.setState({ loading: true });
    setLoading(true);
    // this.setState({ currentLanguage: text });
    setCurrentLanguage(text);
    try {
      let encodedText = encodeURIComponent(text);
      let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${perPage}&per_page=${perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

      const res = await axios.get(url);
      console.log(res.data);
      console.log(res.data.total_count);
      let pageCount = Math.ceil(res.data.total_count / perPage);
      console.log(pageCount);
      // this.setState({
      //   items: res.data.items,
      //   totalCount: res.data.total_count,
      //   pageCount: pageCount
      // });
      setItems(res.data.items);
      setTotalCount(res.data.totalCount);
      setPageCount(pageCount);
    } catch (error) {
      console.log(error);
    }
    // this.setState({ loading: false });
    setLoading(false);
  };

  const handlePageClick = async ele => {
    console.log(`handle Page click : ${currentLanguage}`);
    // this.setState({
    //   items: [],
    //   loading: true
    // });
    setItems([]);
    setLoading(true);
    let selectedPage = ele.selected;
    let encodedText = encodeURIComponent(currentLanguage);
    console.log(selectedPage);
    // this.setState({ pageNo: selectedPage + 1 });
    setPageNo(selectedPage + 1);
    let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${pageNo}&per_page=${perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const res = await axios.get(url);
      // this.setState({
      //   items: res.data.items
      // });
      setItems(res.data.items);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  /* GET sINGLE USER DATA */
  const getSingleUser = async userName => {
    // this.setState({
    //   loading: true
    // });
    setLoading(true);
    let url = `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const res = await axios.get(url);

      // this.setState({ user: res.data, loading: false });
      setLoading(false);
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const showAlert = (msg, type) => {
    console.log(msg);
    console.log(type);
    // this.setState({ alert: { msg, type } });
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };
  const clearuser = () => {
    // this.setState({ items: [], totalCount: 0 });
    setItems([]);
    setTotalCount(0);
  };

  return (
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
                <div className="row" style={{ margin: '5%' }}>
                  <Alert alert={alert} />
                </div>
                <div className="row" style={{ margin: '5%' }}>
                  <SearchBar
                    searchRepo={searchRepo}
                    setAlert={showAlert}
                    clearuser={clearuser}
                  />
                </div>

                <User items={items} loading={loading} />
                {totalCount != 0 && (
                  <div className="row" style={{ margin: '5%' }}>
                    <div className="col s12">
                      <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={10}
                        pageRangeDisplayed={10}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={props => (
              <UserProfile
                {...props}
                getSingleUser={getSingleUser}
                user={user}
                loading={loading}
              />
            )}
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
  );
};

export default App;
