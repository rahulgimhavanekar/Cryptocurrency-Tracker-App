import React, { useContext } from "react";
import { CryptoContext } from "../../context/cypto-context";
import classes from "./SelectButton.module.css";

const SelectButton = () => {
  const { changeCurrency } = useContext(CryptoContext);

  const onChangeHandler = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <select className={classes.select} onChange={onChangeHandler}>
      <option value="INR" className={classes.option}>
        INR
      </option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
    </select>
  );
};

export default SelectButton;
