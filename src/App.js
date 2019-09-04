import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import User from './components/users/User';
import SearchBar from './components/Search/SearchBar';
import ReactPaginate from 'react-paginate';
import Alert from './components/layout/Alert';
import blobShape from './components/layout/blob-shape.svg';
import axios from 'axios';
import About from './pages/About';
import './App.css';

class App extends React.Component {
  state = {
    items: [],
    pageNo: 1,
    perPage: 30,
    totalCount: 0,
    loading: false,
    currentLanguage: '',
    pageCount: 0,
    alert: null
  };
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

  searchRepo = async (text, languages) => {
    console.log(text);
    console.log(languages);
    console.log(`first load search repo : ${this.state.currentLanguage}`);
    this.setState({ loading: true });
    this.setState({ currentLanguage: text });
    try {
      let encodedText = encodeURIComponent(text);
      let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${this.state.perPage}&per_page=${this.state.perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

      const res = await axios.get(url);
      console.log(res.data);
      console.log(res.data.total_count);
      let pageCount = Math.ceil(res.data.total_count / this.state.perPage);
      console.log(pageCount);
      this.setState({
        items: res.data.items,
        totalCount: res.data.total_count,
        pageCount: pageCount
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };

  handlePageClick = async ele => {
    console.log(`first load handle click : ${this.state.currentLanguage}`);
    this.setState({
      items: [],
      loading: true
    });
    let selectedPage = ele.selected;
    let encodedText = encodeURIComponent(this.state.currentLanguage);
    console.log(selectedPage);
    this.setState({ pageNo: selectedPage + 1 });
    let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${this.state.pageNo}&per_page=${this.state.perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const res = await axios.get(url);
      this.setState({
        items: res.data.items
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: true });
    }
    this.setState({ loading: false });
  };
  setAlert = (msg, type) => {
    console.log(msg);
    console.log(type);
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };
  clearuser = () => {
    this.setState({ items: [], totalCount: 0 });
  };
  render() {
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
                    <Alert alert={this.state.alert} />
                  </div>
                  <div className="row" style={{ margin: '5%' }}>
                    <SearchBar
                      searchRepo={this.searchRepo}
                      setAlert={this.setAlert}
                      clearuser={this.clearuser}
                    />
                  </div>

                  <User items={this.state.items} loading={this.state.loading} />
                  {this.state.totalCount != 0 && (
                    <div className="row" style={{ margin: '5%' }}>
                      <div className="col s12">
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={10}
                          pageRangeDisplayed={10}
                          onPageChange={this.handlePageClick}
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
  }
}

export default App;
