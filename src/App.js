import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";

import GithubUsers from "./Components/GithubUsers";

function App() {
  return (
    <div>
      <GithubUsers />
    </div>
  );
}

export default App;
