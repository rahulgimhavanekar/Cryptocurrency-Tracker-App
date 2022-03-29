import React, { useEffect, useState, useContext } from "react";
import CoinList from "../Coins/CoinList";
import axios from "axios";
import { CryptoContext } from "../../context/cypto-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { currency } = useContext(CryptoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        setCoinList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currency]);

  return (
    <div className={classes.home}>
      <div className={classes.main}>
        <p>Get all information about your favourite cryptocurrency</p>
        <input
          type="text"
          id="search"
          placeholder="Search your cryptocurrency..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {!loading ? (
        <CoinList inputText={searchText} list={coinList} />
      ) : (
        <div className={classes.centered}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Home;
