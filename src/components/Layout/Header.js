import React from "react";
import { useHistory } from "react-router-dom";
import SelectButton from "../SelectButton/SelectButton";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();

  return (
    <header className={classes.header}>
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        <h1>Crypto Tracker</h1>
      </div>
      <SelectButton />
    </header>
  );
};

export default Header;
