import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import {
  SEARCH_REPO,
  GET_SINGLE_USER,
  HANDLE_PAGE_CLICK,
  SET_LOADING,
  SET_TOTAL_COUNT,
  SET_PAGE_COUNT,
  SET_CURRENT_LANG,
  SET_PAGE_NO
} from '../types';

const GithubState = props => {
  const initialState = {
    items: [],
    pageNo: 1,
    perPage: 30,
    totalCount: 0,
    loading: false,
    currentLanguage: '',
    pageCount: 0,
    user: {}
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const searchRepo = async (text, languages) => {
    setLoading();
    // this.setState({ currentLanguage: text });

    dispatch({
      type: SET_CURRENT_LANG,
      payload: text
    });
    try {
      let encodedText = encodeURIComponent(text);
      let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${state.pageNo}&per_page=${state.perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

      const res = await axios.get(url);
      console.log(res.data);
      console.log(res.data.total_count);
      let pageCount = Math.ceil(res.data.total_count / state.perPage);
      console.log(pageCount);
      // this.setState({
      //   items: res.data.items,
      //   totalCount: res.data.total_count,
      //   pageCount: pageCount
      // });

      dispatch({
        type: SEARCH_REPO,
        payload: res.data.items
      });
      dispatch({
        type: SET_TOTAL_COUNT,
        payload: res.data.totalCount
      });

      dispatch({
        type: SET_PAGE_COUNT,
        payload: pageCount
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearuser = () => {
    // this.setState({ items: [], totalCount: 0 });
    // setItems([]);
    dispatch({
      type: SEARCH_REPO,
      payload: []
    });
    dispatch({
      type: SET_TOTAL_COUNT,
      payload: 0
    });
    // setTotalCount(0);
  };

  /* GET sINGLE USER DATA */
  const getSingleUser = async userName => {
    // this.setState({
    //   loading: true
    // });
    setLoading();
    let url = `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const res = await axios.get(url);

      // this.setState({ user: res.data, loading: false });

      //   setUser(res.data);
      dispatch({
        type: GET_SINGLE_USER,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async ele => {
    console.log(`handle Page click : ${state.currentLanguage}`);
    // this.setState({
    //   items: [],
    //   loading: true
    // });
    // setItems([]);
    dispatch({
      type: SEARCH_REPO,
      payload: []
    });
    setLoading();
    let selectedPage = ele.selected;
    let encodedText = encodeURIComponent(state.currentLanguage);
    console.log(selectedPage);
    // this.setState({ pageNo: selectedPage + 1 });
    // setPageNo(selectedPage + 1);
    dispatch({
      type: SET_PAGE_NO,
      payload: selectedPage + 1
    });
    let url = `https://api.github.com/search/repositories?q=language:${encodedText}&sort=forks&order=desc&page=${state.pageNo}&per_page=${state.perPage}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const res = await axios.get(url);
      // this.setState({
      //   items: res.data.items
      // });
      dispatch({
        type: HANDLE_PAGE_CLICK,
        payload: res.data.items
      });
      //   setItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        items: state.items,
        user: state.user,
        pageNo: state.pageNo,
        perPage: state.perPage,
        totalCount: state.totalCount,
        loading: state.loading,
        currentLanguage: state.currentLanguage,
        pageCount: state.pageCount,
        searchRepo,
        clearuser,
        getSingleUser,
        handlePageClick
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};
export default GithubState;
