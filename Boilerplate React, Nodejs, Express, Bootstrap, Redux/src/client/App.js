import React, { Component } from "react";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary">Button</button>
      </div>
    );
  }
}
