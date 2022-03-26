import React, { useEffect, useState, useContext } from "react";
import CoinList from "../Coins/CoinList";
import axios from "axios";
import { CryptoContext } from "../../context/cypto-context";
import classes from "./Home.module.css";
import SelectButton from "../SelectButton/SelectButton";

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
        <div className={classes.heading}>
          <input
            type="text"
            id="search"
            placeholder="Search your cryptocurrency..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SelectButton />
        </div>
        <p>Get all information about your favourite cryptocurrency</p>
      </div>
      {!loading ? (
        <CoinList inputText={searchText} list={coinList} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
