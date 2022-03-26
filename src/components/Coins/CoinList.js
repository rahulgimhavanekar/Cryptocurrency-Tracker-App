import React from "react";
import Coin from "./Coin";
import classes from "./CoinList.module.css";

const CoinsList = (props) => {
  return (
    <div className={classes.list}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {props.list.slice(0, 11).map((coin) => {
            return (
              <Coin
                key={coin.id}
                rank={coin.market_cap_rank}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                image={coin.image}
                currentPrice={coin.current_price}
                change={coin.price_change_24h}
                marketCap={coin.market_cap}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsList;
