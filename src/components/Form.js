import React, { useState } from 'react';

const Form = props => {
  const initialState = {
    budgetLimit: '',
    receiptAmount: '',
    receiptDesc: '',
  };
  const [input, setInput] = useState(initialState);

  const storeInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submit = e => {
    e.preventDefault();
    props.handleSubmit(input);
    setInput({
      ...input,
      receiptAmount: '',
      receiptDesc: '',
    });
  };

  return (
    <form className="form">
      <label className="form__limit--label" htmlFor="form__limit--input">
        My budget for Black Friday is EUR:
        <input
          className="form__limit--input"
          type="number"
          placeholder="Set budget here..."
          name="budgetLimit"
          value={input.budgetLimit}
          onChange={storeInput} />
      </label>
      <label className="form__receipt--label" htmlFor="form__receipt--input">
        Receipt:
        <input
          className="form__receipt--input"
          type="number"
          placeholder="Type receipt amount here..."
          name="receiptAmount"
          value={input.receiptAmount}
          onChange={storeInput} />
        <input
          className="form__receipt--desc"
          type="text"
          placeholder="Name of my new item is..."
          name="receiptDesc"
          value={input.receiptDesc}
          onChange={storeInput} />
      </label>
      <button className="form__button" type="submit" onClick={submit} onKeyDown={submit}>Decrease budget</button>
    </form>
  );
};

export default Form;
