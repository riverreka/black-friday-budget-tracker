import React from 'react';

const Expense = props => {
  const { receiptAmount, receiptDesc } = props.receipt;
};

const handleClick = props => {
  props.removeReceipt(props.index);
};

return(
<li className="expense">
  <p className="expense__desc"></p>
  <p className="expense__amount"></p>
  <button className="expense__remove-button" onClick="{handleClick}">X</button> // If duplication, item returned etc.
</li>
);

export default Expense;
