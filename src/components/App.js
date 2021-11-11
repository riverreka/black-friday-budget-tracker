import React, { useState, useEffect } from 'react';

import Form from './Form';
import Container from './Container';
import './App.css';

const App = () => {
  const initialState = {
    isInitial: true,
    budgetLimit: '1000',
    receiptArray: [],
  };
  const [state, setState] = useState(initialState);

  const myStorage = window.localStorage;
  const [userId, setUserId] = useState(myStorage.getItem('userId'));

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
      fetch('/api')
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

  useEffect(fetchUserData, []); // Empty trigger array means to only run function on 1st render

  const postUserData = () => {
    // don't post initial state, it would overwrite server data store
    if (!state.isInitial) {
      const req = {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`/api/${userId}`, req)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        })
        .catch(err => console.error(err));
    }
  };

  // call postUsedData everytime state changed
  useEffect(postUserData, [state]);

  const handleSubmit = input => {
    if (input.receiptAmount !== '') {
      setState({
        budgetLimit: input.budgetLimit,
        receiptArray: [...state.receiptArray, {
          receiptAmount: input.receiptAmount,
          receiptDesc: input.receiptDesc,
        },
        ],
      });
    } else if (input.budgetLimit !== state.budgetLimit) {
      setState({
        budgetLimit: input.budgetLimit,
        receiptArray: [...state.receiptArray],
      });
    }
  };

  const removeReceipt = index => {
    setState({
      budgetLimit: state.budgetLimit,
      receiptArray: state.receiptArray.filter((_, i) => i !== index),
    });
  };

  const calcBudgetLeft = () => {
    if (state.receiptArray.length) {
      return state.budgetLimit
      - state.receiptArray.reduce((prev, cur) => prev + Number.parseInt(cur.receiptAmount, 10), 0);
    }
    return state.budgetLimit;
  };

  return (
    <div className="App">
      <header className="App-header">BLACK FRIDAY BUDGET-TRACKER</header>
      <Form handleSubmit={handleSubmit} budgetLimit={state.budgetLimit} />
      <div className="budget-left">
        Budget left:
        {calcBudgetLeft()}
      </div>
      <Container
        receiptArray={state.receiptArray}
        removeReceipt={removeReceipt} />
    </div>
  );
};

export default App;
