import React, { useContext } from "react";
import { CryptoContext } from "../../context/cypto-context";
import { numberWithCommas } from "../../utils";
import classes from "./WatchList.module.css";

const WatchList = (props) => {
  const { watchList, coinList, symbol, removeFromWatchList } =
    useContext(CryptoContext);

  return (
    <div className={classes.wl}>
      <div className={classes.wl_header}>
        <h3>Your Watchlist</h3>
        <button onClick={props.onClose}>X </button>
      </div>
      <div className={classes.wl_content}>
        {watchList.map((item) => {
          const coin = coinList.find((coin) => coin.id === item);
          return (
            <div className={classes.coin_box} key={coin.id}>
              <p>{coin.name}</p>
              <p>
                {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
              </p>
              <button
                onClick={() => {
                  removeFromWatchList(coin.id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchList;
