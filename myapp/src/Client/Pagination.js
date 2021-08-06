import React from "react";

const Pagination = ({ moviesPerPage, totalMovies }) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a href="!#">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
