import React from 'react';
import Expense from './Expense';

const uuid = require('uuid');

const Container = ({ receiptArray, removeReceipt }) => {
  const expenseArray = receiptArray.map((receipt, index) => (
    <Expense
      index={index}
      receipt={receipt}
      key={uuid.v4()}
      removeReceipt={removeReceipt} />
  ));

  return (
    <ul className="container__expense-item">{expenseArray}</ul>
  );
};

export default Container;
