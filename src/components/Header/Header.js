import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SelectButton from "./SelectButton";
import WatchList from "./WatchList";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const [showWatchList, setWatchList] = useState(false);

  const openWatchList = () => {
    setWatchList(true);
  };

  const closeWatchList = () => {
    setWatchList(false);
  };

  return (
    <header className={classes.header}>
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        <h1>Crypto Tracker</h1>
      </div>
      <div className={classes.right_side}>
        <SelectButton />
        <button onClick={openWatchList}>Watchlist</button>
      </div>
      {showWatchList && <WatchList onClose={closeWatchList} />}
    </header>
  );
};

export default Header;
