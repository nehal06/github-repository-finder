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

export default (state, action) => {
  switch (action.type) {
    case SEARCH_REPO:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
      break;
    case SET_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.payload
      };

      break;
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload
      };
      break;
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
      break;
    case SET_CURRENT_LANG:
      return {
        ...state,
        currentLanguage: action.payload
      };
      break;
    case GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload
      };
      break;
    case HANDLE_PAGE_CLICK:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
      break;
    case SET_PAGE_NO:
      return {
        ...state,
        pageNo: action.payload
      };
      break;
    default:
      return state;
      break;
  }
};
