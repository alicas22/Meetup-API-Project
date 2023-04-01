import { csrfFetch } from "./csrf";

const CREATE_SEARCH = 'search/CREATE_SEARCH';
const CLEAN_SEARCH = 'search/CLEAN_SEARCH';

const createSearch = (results) => ({
  type: CREATE_SEARCH,
  results,
});


export const cleanUpSearchAction = () => {
  return {
    type: CLEAN_SEARCH,
  };
};

export const thunkCreateSearch = (query) => async (dispatch) => {

  const response = await csrfFetch(`/api/search?q=${query}`, {
  });

  if (response.ok) {
    const newSearch = await response.json();
    dispatch(createSearch(newSearch));
    return newSearch;
  }
};

const normalize = (arr) => {
  if (arr.length === 0) {
    return {};
  }

  const resObj = {};
  arr.forEach((ele) => {
    resObj[ele.id] = ele;
  });
  return resObj;
};

const initialState = {
  Groups: {},
  Events: {},
};

const searchReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE_SEARCH:
      if (Object.keys(action.results).length > 0) {
        newState = { ...state };
        newState.Groups = {};
        newState.Events = {};
        action.results.groups.forEach((result) => {
          newState.Groups[result.id] = result;
        });
        action.results.events.forEach((result) => {
          newState.Events[result.id] = result;
        });
        return newState;
      } else {
        newState = { ...state };
        return newState;
      }
    case CLEAN_SEARCH: {
      const newState = { ...initialState };
      return newState;
    }
    default:
      return state;
  }
};

export default searchReducer;
