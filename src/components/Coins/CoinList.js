import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CryptoContext } from "../../context/cypto-context";
import { numberWithCommas } from "../../utils";
import Pagination from "../Pagination/Pagination";

import classes from "./CoinList.module.css";

const CoinsList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(props.list);
  const history = useHistory();
  const { symbol } = useContext(CryptoContext);

  const countPerPage = 10;

  console.log(currentPage);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    const data = props.list.filter((coin) => {
      return coin.name.toLowerCase().includes(props.inputText);
    });
    setCollection(data);
  }, [props.list, props.inputText]);

  const updatePage = useCallback(() => {
    const firstPageIndex = (currentPage - 1) * countPerPage;
    const lastPageIndex = firstPageIndex + countPerPage;
    setCollection(props.list.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, props.list]);

  useEffect(() => {
    if (props.inputText === "") {
      updatePage();
    } else {
      handleSearch();
    }
  }, [props.inputText, handleSearch, updatePage]);

  return (
    <div className={classes.list}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className={classes.coin_header}>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {collection.length === 0 ? (
            <tr>
              <td colSpan="5" className={classes.not_found}>
                No coins found!
              </td>
            </tr>
          ) : (
            collection.map((coin) => {
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
                        <h3 className={classes.symbol}>{coin.symbol}</h3>
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
            })
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        dataLength={props.list.length}
        pageLimit={5}
        dataLimit={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CoinsList;
