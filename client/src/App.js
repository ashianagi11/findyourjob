import React from 'react';
import './App.css';
import Search from "./searchbar"; 
import Result from "./result";
import About from './about'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/results/:skill_name" component={Result} />
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
