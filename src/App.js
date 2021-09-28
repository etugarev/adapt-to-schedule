import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Presentation from "./components/Presentation";
import Schedule from "./components/Schedule";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/presentation/:path+" component={Presentation}></Route>
        <Route path="/" component={Schedule}></Route>
      </Switch>
    </Router>
  );
}

export default App;
