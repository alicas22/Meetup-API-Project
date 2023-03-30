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
  const response = await fetch(`/api/search?q=${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });

  if (response.ok) {
    const newSearch = await response.json();
    dispatch(createSearch(newSearch));
    return newSearch;
  }
};

const normalize = (arr) => {
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
        action.results.forEach((result) => {
          if (result.type === 'Group') {
            newState.Groups[result.id] = result;
          } else if (result.type === 'Event') {
            newState.Events[result.id] = result;
          }
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
