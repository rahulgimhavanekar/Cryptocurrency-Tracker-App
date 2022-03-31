import React, { useState, useEffect } from "react";
import axios from "axios";

export const CryptoContext = React.createContext();

const CryptoProvider = (props) => {
  const [coinList, setCoinList] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");
  const [loading, setLoading] = useState(false);
  const [watchList, setWatchList] = useState([]);

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

  const addToWatchList = (id) => {
    setWatchList((prevState) => [...prevState, id]);
  };

  const removeFromWatchList = (id) => {
    setWatchList((prevState) => prevState.filter((coin) => coin !== id));
  };

  const changeCurrency = (newCurrency) => {
    if (newCurrency === "INR") {
      setCurrency("inr");
      setSymbol("₹");
    } else if (newCurrency === "USD") {
      setCurrency("usd");
      setSymbol("$");
    } else if (newCurrency === "EUR") {
      setCurrency("eur");
      setSymbol("€");
    } else if (newCurrency === "GBP") {
      setCurrency("gbp");
      setSymbol("£");
    } else if (newCurrency === "JPY") {
      setCurrency("jpy");
      setSymbol("¥");
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        coinList,
        loading,
        watchList,
        changeCurrency,
        addToWatchList,
        removeFromWatchList,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
