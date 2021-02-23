import React from 'react';
import './App.css';
import WebcamCapture from './webcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from './Preview';

function App() {
  return (
    <div className="app">
      {/* <h1>lets build snapchat</h1> */}
      <Router>
      <div className="app_body">
        <Switch>
          <Route  path="/preview">
            <Preview/>
          </Route>
          <Route exact path="/">
            <WebcamCapture/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
