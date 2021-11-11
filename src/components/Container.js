import React from 'react';
import Expense from './Expense';

const Container = ({ receiptArray, removeReceipt }) => {
  const expenseArray = receiptArray.map((receipt, index) => (
    <Expense
      index={index}
      receipt={receipt}
      key={new Date().getTime()}
      removeReceipt={removeReceipt} />
  ));

  return (
    <ul className="container__expense-item">{expenseArray}</ul>
  );
};

export default Container;
