import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import Container from './Container';

const App = () => {
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

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Form />
        <Container
          receiptArray={state.receiptArray}
          removeReceipt={removeReceipt} />
      </header>
    </div>
  );
};

export default App;
