import React, { useState } from "react";
import { Switch, Link, Route } from "react-router-dom";
import axios from "axios";
import styles from "./AddMovie.module.css";

const AddMovie = () => {
  const [newMovieObj, setObj] = useState({
    name: "",
    genres: [],
    image: {
      original: "",
    },
    date: ""
  });

  let addMovieToDB = async() => {
    console.log(newMovieObj.genres);
    if (newMovieObj.genres.includes(",")) {
      var genreArr = newMovieObj.genres.split(",");
    } else {
      var genreArr = [newMovieObj.genres];
    }
    console.log(genreArr);
    let movieObj = {
      name: newMovieObj.name,
      genres: genreArr,
      premiered: newMovieObj.date,
      image: {
        original: newMovieObj.image,
      },
    };
     console.log(movieObj);
     await axios.post("http://localhost:8001/movies", movieObj)
     .then(() => {
      alert(movieObj.name + " has been added")
       window.location.href = "/home/moviesmain/movies";
      })
    
  };
  return (
    <div>
      <div className={styles.gridcontainer}>
        Name:
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setObj((newMovieObj) => ({ ...newMovieObj, name: e.target.value }))
          }
        />
        Genres:
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setObj((newMovieObj) => ({
              ...newMovieObj,
              genres: e.target.value,
            }))
          }
        />
        Image Url:
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setObj((newMovieObj) => ({ ...newMovieObj, image: e.target.value }))
          }
        />
        Premiered Date:
        <input
          className={styles.gridcell}
          type="date"
          onChange={(e) =>
            setObj((newMovieObj) => ({ ...newMovieObj, date: e.target.value }))
          }
        />
      </div>
      <div>
        <button onClick={addMovieToDB} className={styles.btnmargin}>Save</button>
        <Link to="home/moviesmain">
          <button className={styles.btnmargin}>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default AddMovie;
