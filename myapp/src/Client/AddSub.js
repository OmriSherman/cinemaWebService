import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const AddSub = (props) => {
  const [subs, setSubs] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [date, setDate] = useState("");
  const [finalArr, setFinalArr] = useState([]);
  const [movies, setMoviesArr] = useState(props.movies);
  const memId = props.userId;

  useEffect(() => {
    axios.get("http://localhost:8001/subs").then((data) => {
      setSubs(data.data);
    });
  }, []);

  useEffect(() => {
    if (movies.length > 0 && subs.length > 0) {
      let res = subs.filter((sub) => sub.memberId == memId);
      console.log(res);
      if (res.length) {
        let finalMoviesArr = movies.filter((movie) => {
          var subsArr = res.map((item) => {
            return item.movies[0].movieId;
          });
          if (subsArr.indexOf(movie._id) === -1) {
            return movie;
          }
        });
        setFinalArr([...finalMoviesArr]);
      } else {
        setFinalArr([...movies]);
      }
    }
    console.log(finalArr);
  }, [subs]);

  let selectMovie = finalArr?.map((movie, index) => {
    return (
      <option key={index + 1} value={movie._id}>
        {movie.name}
      </option>
    );
  });

  let saveSub = () => {
    let subObj = {
      memberId: memId,
      movies: [
        {
          movieId: movieId,
          date: date,
        },
      ],
    };
    axios.post("http://localhost:8001/subs", subObj);
    alert("subscription added!");
    window.location.href="/home/subsmain/members";
  };
  return (
    <div>
      <select name="movies" onChange={(e) => setMovieId(e.target.value)}>
        <option key={0} value={0}>
          Select Movie
        </option>
        {selectMovie}
      </select>
      <input type="date" onChange={(e) => setDate(e.target.value)}></input>
      <div>
        <button onClick={saveSub}>Subscribe</button>
      </div>
    </div>
  );
};

export default AddSub;
