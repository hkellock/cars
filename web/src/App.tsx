import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import './App.css';
import Cars from './components/Car/CarList';
import Comparison from './components/Comparison/Comparison';
import { Container } from '@material-ui/core';
import Drawer from './components/Drawer/Drawer';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
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
      </SnackbarProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
