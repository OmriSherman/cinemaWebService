import React, { useEffect, useState } from "react";
import styles from "./Movie.module.css";
import { Switch, Route, Link } from "react-router-dom";
import EditMovie from "./EditMovie";
import axios from "axios";
import SubscriptionsWatched from "./SubscriptionsWatched";

const Movie = (props) => {
  const [isdeleted, deleteMovieCheck] = useState(0);
  const [subData, setSubsData] = useState([]);
  const [userNamesArr, setUserNames] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [permArr, setPermArr] = useState([]);

  let deleteMovie =() => {
    axios.delete(`http://localhost:8001/movies/${props.movieId}`)
    .then(()=> {
      alert("movie deleted!")
      window.location.href="/home/moviesmain/movies"
    })

  };

  useEffect(() => {
     axios.get("http://localhost:8001/subs").then((data) => {
      let usersData = data.data;
      setSubsData(usersData);
    });
    axios.get(`http://localhost:8000/permissions/${userId}`)
        .then((data) => setPermArr((data.data.permissions)));
  }, []);

  useEffect(() => {
    if (subData) {
      let usersData = subData;
      var newArr = [];
      for (let i = 0; i < usersData.length; i++) {
        let movies = usersData[i].movies;
        
        for (let j = 0; j < movies.length; j++) {
          let movieId = movies[j].movieId;
          if (movieId == props.movieId) {
            let subscriptionId = usersData[i]._id;
            newArr.push(subscriptionId);
          }
        }
        setUserNames(newArr);
      }
    }
  }, [subData]);

  let memberSubs = userNamesArr.map((id) => {
    return <SubscriptionsWatched memId={id} />;
  });

  return (
    <div>
    {(props.searchStr.length == 0 || props.movieName.toLowerCase().includes(props.searchStr)) ?
    <div className={styles.alignmovie}>
       <img className={styles.image} src={props.movieImg} />
      <div>
        <li key={props.movieId} className={styles.mainli}>
        </li>
        <li className={styles.lifont}>{props.movieName}, {props.movieYear.substring(0, 4)}</li>
        <li className={styles.lifont}>Genres: {props.movieGenres.join()}</li>
        <li>{userNamesArr.length > 0 ? <div>Subscriptions watched:</div> : ''}</li>    
        <li><div>{memberSubs}</div></li>
        {(permArr.indexOf("update movies") > -1 ?
          <Link to={`/home/moviesmain/movies/${props.movieId}`}>
            <button>Edit</button>
          </Link>
          :'' )}
          {(permArr.indexOf("delete movies") > -1 ?
          <button onClick={deleteMovie}>Delete</button>
          : '' )}
      </div>
      <div>
        <Switch>
          <Route
            exact
            path="/home/moviesmain/movies/:id"
            component={EditMovie}
          />
        </Switch>
      </div>
    </div>
    : '' }
    </div>
  );
};

export default Movie;
