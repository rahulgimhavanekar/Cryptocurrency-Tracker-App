import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CryptoContext } from "../../../context/cypto-context";
import CoinChart from "./CoinChart";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./CoinInfo.module.css";

const CoinInfo = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [currentCoin, setCurrentCoin] = useState();
  const { currency, symbol } = useContext(CryptoContext);

  useEffect(() => {
    const fetchSingleCoin = async (coinId) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        setCurrentCoin(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCoin(params.id);
  }, [params.id, currency]);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.centered}>
          <LoadingSpinner />
        </div>
      ) : (
        <section className={classes.sidebar}>
          <div className={classes.image_box}>
            <img src={currentCoin?.image.large} alt={currentCoin?.name} />
          </div>
          <h3>{currentCoin?.name}</h3>
          <div className={classes.market_data}>
            <p className={classes.rank}>Rank: {currentCoin?.market_cap_rank}</p>
            <p className={classes.price}>
              Current Price: {symbol}{" "}
              {currentCoin?.market_data.current_price[currency]}
            </p>
            <p className={classes.market_cap}>
              Market Cap: {symbol}{" "}
              {currentCoin?.market_data.market_cap[currency]}
            </p>
          </div>
        </section>
      )}
      <CoinChart />
    </div>
  );
};

export default CoinInfo;
