import React from 'react';
import './App.css';
import Nav from './Nav';

import CurrencyApp from './Currency/CurrencyApp'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TicTacToe from './TicTacToe/TicTacToe';
import Todo from './Todo/TodoApp';
import Recepty from './Recepty/Recepty';
import ReceptyV2 from './ReceptyV2/ReceptyV2';
import ReceptInfo from './ReceptyV2/ReceptInfo';
import MainIndex from './mainIndex';
import ExpenseTrackerApp from './ExpenseTracker/ExpenseTrackerApp';
import IsometricCSS from './IsometricCSS/IsometricCSS';

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/production4/" component={Home} exact />
          <Route path="/Currency/CurrencyApp" component={CurrencyApp} />
          <Route path="/TicTacToe/TicTacToe" component={TicTacToe} />
          <Route path="/Todo/TodoApp" component={Todo} />
          <Route path="/Recepty/Recepty" component={Recepty} />
          <Route path="/ReceptyV2/ReceptyV2" exact component={ReceptyV2} />
          <Route path="/ReceptyV2/ReceptyV2/:id" component={ReceptInfo} />
          <Route path="/ExpenseTracker/ExpenseTrackerApp" component={ExpenseTrackerApp} />
          <Route path="/IsometricCSS/IsometricCSS" component={IsometricCSS} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <MainIndex />
  </div>
)

export default App;
