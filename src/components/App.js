// import React from 'react';
import { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Container from './Container';
import Expense from './Expense';

const initialState = {
  budgetLimit: '1000',
  receiptAmount: '50',
  receiptDesc: 'gadget',
};
const [state, setState] = useState(initialState);

const myStorage = window.localStorage;
const [userId, setUserId] = setState(myStorage.getItem('userId'));

const fetchUserData = () => {
  if (userId) {
    fetch(`/api/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(savedData => setState(savedData))
      .catch(err => console.error(err));
  } else {
    fetch('/api/')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(newId => {
        setUserId(newId);
        myStorage.setItem('userId', newId);
      })
      .catch(err => console.error(err));
  }
};

useEffect(fetchUserData());

// const handleSubmit = () => {};

const removeReceipt = index => {
  setState({
    budgetLimit: state.budgetLimit,
    receiptArray: state.receiptArray.filter((_, i) => i !== index),
  });
};

const App = () => ((
  <div className="App">
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Expense handlesubmit={state.handleSubmit} />
      <Container
        receiptArray={state.receiptArray}
        removeReceipt={removeReceipt} />
    </header>
  </div>
));

export default App;
