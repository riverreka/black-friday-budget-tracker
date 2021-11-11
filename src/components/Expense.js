import React from 'react';

const Expense = ({ index, receipt, removeReceipt }) => {
  const handleClick = () => {
    removeReceipt(index);
  };

  return (
    <li className="expense">
      <p className="expense__desc">{receipt.receiptDesc}</p>
      <p className="expense__amount">{receipt.receiptAmount}</p>
      <button type="submit" className="expense__remove-button" onClick={handleClick}>X</button>
    </li>
  );
};

export default Expense;
