import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div>
        <h1>Crypto Tracker</h1>
      </div>
    </header>
  );
};

export default Header;
