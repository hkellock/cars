import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import './App.css';
import Cars from './components/Car/CarList';
import Comparison from './components/Comparison/Comparison';
import { Container } from '@material-ui/core';
import Drawer from './components/Drawer/Drawer';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        <Drawer />
        <Container>
          <Switch>
            <Route path="/cars">
              <Cars />
            </Route>
            <Route>
              <Comparison />
            </Route>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
