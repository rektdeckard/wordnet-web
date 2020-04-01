import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Session from "./Session";
import SessionLog from "./SessionLog";
import Missing from "../Missing";

const Explore = () => {
  return (
    <Switch>
      <Route exact path="/explore" component={Dashboard} />
      <Route path="/explore/sessions/:id" component={Session} />
      <Route exact path="/explore/sessions" component={SessionLog} />
      <Route render={Missing} />
    </Switch>
  );
};

export default Explore;
