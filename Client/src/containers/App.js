import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Calculator from './Calculator';
import AllMeals from './AllMeals';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={ Welcome } />
        <Route exact path='/dashboard' component={ Dashboard } />
        <Route exact path='/calculator' component={ Calculator } />
        <Route exact path='/meals' component={ AllMeals } />
        <Route path="/register" component={ Register }/>
        <Route path="/login" component={ Login }/>
      </Switch>
    </div>
  );
}

export default App;
