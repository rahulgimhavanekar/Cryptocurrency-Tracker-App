import React from "react";
import classes from "./Search.module.css";

const Search = () => {
  return (
    <div className={classes.main}>
      <div className={classes.heading}>
        <input
          type="text"
          id="search"
          placeholder="Search your cryptocurrency..."
        />
        <select>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <p>Get all information about your favourite cryptocurrency</p>
    </div>
  );
};

export default Search;
