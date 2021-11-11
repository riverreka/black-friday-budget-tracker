import React from 'react';

const Expense = props => {
  const { receiptAmount, receiptDesc } = props.receipt;

  const handleClick = () => {
    props.removeReceipt(props.index);
  };

  return (
    <li className="expense">
      <p className="expense__desc">{receiptDesc}</p>
      <p className="expense__amount">{receiptAmount}</p>
      <button type="submit" className="expense__remove-button" onClick={handleClick}>X</button>
    </li>
  );
};

export default Expense;
