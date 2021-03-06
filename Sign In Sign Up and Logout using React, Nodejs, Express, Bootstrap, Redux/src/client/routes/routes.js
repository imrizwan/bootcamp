import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../comp/Dashboard";
import Home from "../comp/Home";
import SignIn from "../comp/SignIn";
import SignUp from "../comp/SignUp";
import Message from "../comp/Message";

export default class AppRoute extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/message" component={Message} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
