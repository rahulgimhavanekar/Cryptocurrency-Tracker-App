import React, { useState } from "react";

export const CryptoContext = React.createContext();

const CryptoProvider = (props) => {
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");

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
    } else if (newCurrency === "CNY") {
      setCurrency("cny");
      setSymbol("¥");
    }
  };

  return (
    <CryptoContext.Provider value={{ currency, symbol, changeCurrency }}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
