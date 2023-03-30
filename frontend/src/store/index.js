import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import groupsReducer from "./groups";
import eventsReducer from "./events";
import sessionReducer from './session';
import mapsReducer from "./maps";
import attendeesReducer from "./attendees";
import membersReducer from "./members";
import searchReducer from "./search";

const rootReducer = combineReducers({
  session: sessionReducer,
  groups: groupsReducer,
  events: eventsReducer,
  maps: mapsReducer,
  attendees: attendeesReducer,
  members:membersReducer,
  search: searchReducer
});


let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
