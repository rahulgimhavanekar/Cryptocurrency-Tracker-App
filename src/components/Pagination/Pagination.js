import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  pageLimit,
  dataLimit,
  onPageChange,
  dataLength,
}) => {
  const lastPage = Math.round(dataLength / dataLimit);

  const previousPage = () => {
    onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    onPageChange(currentPage + 1);
  };

  const changePage = (event) => {
    onPageChange(event.target.textContent);
  };

  const paginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className={classes.pagination_container}>
      <button
        className={`${classes.prev} ${
          currentPage === 1 ? classes.disabled : ""
        }`}
        onClick={previousPage}
      >
        {"<"}
      </button>
      <div className={classes.pagination_item}>
        {paginationGroup().map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={changePage}
              className={`${classes.button} ${
                item === currentPage ? classes.active : ""
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        className={`${classes.prev} ${
          currentPage === lastPage ? classes.disabled : ""
        }`}
        onClick={nextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
