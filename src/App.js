import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Decrypt from './components/Decrypt';
import Encrypt from './components/Encrypt';
import Header from './components/Header';
import Home from './components/Home';

const App = () => (
  <>
    <Header />
    <main className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
      <div className="container-md">
        <div className="row mx-0 justify-content-center">
          <div className="col-md-9">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/encrypt">
                <Encrypt />
              </Route>
              <Route path="/decrypt">
                <Decrypt />
              </Route>
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default App;
