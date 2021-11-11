import React from 'react';
import Expense from './Expense';

const Container = props => {
  const expenseArray = props.receiptArray.map((receipt, index) => {
    <Expense
      index={index}
      receipt={receipt}
      key={index}
      removeReceipt={props.removeReceipt}/>
  });

  return(
    <ul className="container__expense-item">{expenseArray}</ul>
  );
};

export default Container;
