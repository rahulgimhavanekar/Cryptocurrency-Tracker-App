import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Coin.module.css";

const Coin = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/coins/:${props.id}`);
  };

  return (
    <tr onClick={onClickHandler}>
      <td>{props.rank}</td>
      <td>
        <div className={classes.coin}>
          <div className={classes.logo}>
            <img src={props.image} alt={props.name} />
          </div>
          <div className={classes.name}>
            <span>{props.symbol}</span>
            <p>{props.name}</p>
          </div>
        </div>
      </td>
      <td>{props.currentPrice}</td>
      <td>{props.change}</td>
      <td>{props.marketCap}</td>
    </tr>
  );
};

export default Coin;
