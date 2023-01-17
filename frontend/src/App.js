import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import Groups from './components/Groups'
import Events from './components/Events'
import EventsGroupsNav from "./components/EventsGroupsNav";

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
          <Route path='/groups'>
            <EventsGroupsNav />
            <Groups />
            </Route>
          <Route path='/events'>
            <EventsGroupsNav />
            <Events />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
