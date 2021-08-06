import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import styles from "./AllMovies.module.css";
import Movie from "./Movie";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrPage] = useState(1);
  const [moviesPerPage, setPostsPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    let getMovies = async () => {
      let dataResp = await axios.get("http://localhost:8001/movies");
      setMovies(dataResp.data);
    };
    getMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);


  let items = currentMovies.map((movie) => {

    return (
      <Movie
        movieId={movie._id}
        movieName={movie.name}
        movieGenres={movie.genres}
        movieYear={movie.premiered}
        movieImg={movie.image}
        searchStr = {searchStr}
      />
    );
  });
  const pageCount = Math.ceil(movies.length / moviesPerPage);
  console.log(currentPage);

  const changePage = ({selected}) => {
    setCurrPage(selected+1);
    console.log(currentPage);
  };
  const searchMovie = (e) => {
    setSearchStr(e.target.value);
  }
  return (
    <div><br/>
    <div>Search Movie: <input onChange={searchMovie}/></div>
    <div className="moveleft">
      <ul className={styles.ultype}>{items}</ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
    </div>
  );
};

export default AllMovies;
