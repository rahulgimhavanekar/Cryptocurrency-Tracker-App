import React, { useEffect, useState, useContext } from "react";
import CoinList from "../Coins/CoinList";
import { CryptoContext } from "../../context/cypto-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Home.module.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");

  const { loading, coinList } = useContext(CryptoContext);

  useEffect(() => {}, []);

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
