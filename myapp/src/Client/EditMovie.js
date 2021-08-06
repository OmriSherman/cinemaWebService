import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditMovie.module.css";
import { Link, useParams } from "react-router-dom";

const EditMovie = () => {
  const [movieId] = useState(useParams().id);
  const [newData, setData] = useState({});

  useEffect(async() => {
   
      let movieData = await axios.get(
        `http://localhost:8001/movies/${movieId}`
      );
    
      setData((newData) => ({
        ...newData,
        genres: movieData.data.genres,
        name: movieData.data.name,
        image: movieData.data.image,
        premiered: movieData.data.premiered.slice(0,10)
      }));
      
  }, []);


  let updateMovie = () => {
    if (newData.genres.includes(",")) {
      var genreArr = newData?.genres.split(",");
    } else {
      var genreArr = newData.genres;
    }

    let updatedObj = {
      genres: genreArr,
      name: newData.name,
      image: {
        original: newData.image
      },
      premiered: newData.premiered

    };
    axios.put(`http://localhost:8001/movies/${movieId}`,updatedObj);
    alert (newData.name + " has been updated!")
    window.location.href="/home/moviesmain/movies";

  };

  return (
    <div>
      <span>Edit Selected Movie</span>
      <div className={styles.gridcontainer}>
        Name:{" "}
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setData((newData) => ({ ...newData, name: e.target.value }))
          }
          defaultValue={newData.name}
        />
        Genres:{" "}
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setData((newData) => ({ ...newData, genres: e.target.value }))
          }
          defaultValue={newData.genres}
        />
        Premiered:{" "}
        <input
          type="date"
          className={styles.gridcell}
          onChange={(e) =>
            setData((newData) => ({ ...newData, premiered: e.target.value }))
          }
          defaultValue={newData.premiered}
        />
        Image Url:{" "}
        <input
          className={styles.gridcell}
          onChange={(e) =>
            setData((newData) => ({ ...newData, image: e.target.value }))
          }
          defaultValue={newData.image}
        />
        <div className={styles.gridcell}>
          <button onClick={updateMovie}>Save</button>
          <Link to="/home/moviesmain/movies">
            <button>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
