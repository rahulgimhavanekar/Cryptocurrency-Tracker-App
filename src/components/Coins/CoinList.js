import React, { useContext } from "react";
import { CryptoContext } from "../../context/cypto-context";
import { useHistory } from "react-router-dom";

import classes from "./CoinList.module.css";

const CoinsList = (props) => {
  const history = useHistory();
  const { symbol } = useContext(CryptoContext);

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredCoins = props.list.filter((coin) => {
    if (props.inputText === "") {
      return coin;
    } else {
      return (
        coin.name.toLowerCase().includes(props.inputText) ||
        coin.symbol.toLowerCase().includes(props.inputText)
      );
    }
  });

  let content;

  if (filteredCoins.length === 0) {
    content = (
      <tr>
        <td colSpan="5" className={classes.not_found}>
          No coins found!
        </td>
      </tr>
    );
  } else {
    content = filteredCoins.slice(0, 10).map((coin) => {
      const profit = coin.price_change_24h > 0;

      const cssClasses = profit ? classes.profit : classes.loss;
      return (
        <tr
          onClick={() => {
            history.push(`/coins/${coin.id}`);
          }}
          key={coin.id}
        >
          <td>{coin.market_cap_rank}</td>
          <td>
            <div className={classes.coin_row}>
              <div className={classes.logo}>
                <img src={coin.image} alt={coin.name} />
              </div>
              <div className={classes.name}>
                <span>{coin.symbol}</span>
                <p>{coin.name}</p>
              </div>
            </div>
          </td>
          <td>
            {symbol + " "}
            {numberWithCommas(coin.current_price.toFixed(2))}
          </td>
          <td>
            <span className={cssClasses}>
              {symbol + " "}
              {profit && "+"}
              {numberWithCommas(coin.price_change_24h.toFixed(2))}
            </span>
          </td>
          <td>
            {symbol + " "}
            {numberWithCommas(coin.market_cap)}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className={classes.list}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className={classes.header_coin}>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default CoinsList;
