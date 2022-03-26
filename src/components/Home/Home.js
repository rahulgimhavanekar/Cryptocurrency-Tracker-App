import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import CoinList from "../Coins/CoinList";
import axios from "axios";
import classes from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoinList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.home}>
      <Search />
      {!loading ? <CoinList list={coinList} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
