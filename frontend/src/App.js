import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import Groups from './components/Groups'
import GroupDetails from './components/GroupDetails'
import Events from './components/Events'
import EventDetails from './components/EventDetails'
import EventsGroupsNav from "./components/EventsGroupsNav";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path='/groups/:groupId'>
            <GroupDetails />
          </Route>
          <Route path='/groups'>
            <EventsGroupsNav />
            <Groups />
          </Route>
          <Route path='/events'>
            <EventsGroupsNav />
            <Events />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
