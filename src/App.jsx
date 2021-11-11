import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {};

const initialState = {
  budgetLimit: '1000',
  receiptAmount: '50',
  receiptDesc: 'gadget',
};
const [ state, setState ] = useState(initialState);

const handleSubmit = () => {};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
