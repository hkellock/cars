import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import './App.css';
import Cars from './components/Car/CarList';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">Car app</header>
      <Cars />
    </div>
  </ApolloProvider>
);

export default App;
