import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Menu from './components/Menu.component';
import Quiz from './components/Quiz.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Menu} />
          <Route exact path='/quiz/:type' component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
