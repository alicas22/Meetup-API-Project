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
import GroupDetailsAbout from "./components/GroupDetails/GroupDetailsAbout";
import GroupDetailsEvents from './components/GroupDetails/GroupDetailsEvents'
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";

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
          <Route exact path='/groups/:groupId'>
            <GroupDetails />
            <GroupDetailsAbout />
          </Route>
          <Route exact path='/groups/:groupId/events'>
            <GroupDetails />
            <GroupDetailsEvents />
          </Route>
          <Route path='/groups'>
            <EventsGroupsNav />
            <Groups />
          </Route>
          <Route path='/events/:eventId'>
            <EventDetails />
          </Route>
          <Route path='/events'>
            <EventsGroupsNav />
            <Events />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
