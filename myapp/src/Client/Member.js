import React, { useState, useEffect } from "react";
import styles from "./Movie.module.css";
import { Switch, Route, Link } from "react-router-dom";
import EditMember from "./EditMember";
import axios from "axios";
import AddSub from "./AddSub";
import AddIcon from '@material-ui/icons/Add'

const Member = (props) => {
  const [isdeleted, deleteMemberCheck] = useState(0);
  const [subsData, setSubsData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [isClicked, setClicked] = useState(0);
  const [dateArr, setDateArr] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [permArr, setPermArr] = useState([]);

  useEffect(async () => {
    axios
      .get("http://localhost:8001/subs")
      .then((data) => setSubsData(data.data));
    axios
      .get(`http://localhost:8000/permissions/${userId}`)
      .then((data) => setPermArr(data.data.permissions));
  }, []);

  useEffect(() => {
    let finalArrTemp = [];
    for (let i = 0; i < subsData.length; i++) {
      if (subsData[i].memberId === props.memId) {
        let subscribedMovies = subsData[i].movies[0].movieId;
        var movieName = props.movies.map((movie) => {
          if (movie._id === subscribedMovies) {
            return movie.name;
          }
        });

        if (movieName) {
          var filteredMovieName = movieName.filter((name) => {
            return name !== undefined;
          });
        }
        if (filteredMovieName) {
          let finalObj = {
            name: filteredMovieName[0],
            date: subsData[i].movies[0].date,
          };
          finalArrTemp.push(finalObj);
        }
        setFinalArr([...finalArrTemp]);
      }
    }
  }, [subsData, moviesData]);

  let deleteMember = async () => {
    await axios.delete(`http://localhost:8001/mems/${props.memId}`);
  };

  let setClick = () => {
    setClicked((isClicked) => !isClicked);
  };

  let subscriptions = finalArr.map((obj) => {
    return (
      <li>
        {obj.name} , {obj.date}
      </li>
    );
  });

  return (
    
    <div className="item-separator">
      <div>
        <li className={styles.lifont}>{props.memName}</li>
        <li>{props.memEmail}</li>
        <li>
          {permArr.indexOf("update subscriptions") > -1 ? (
            <Link to={`/home/subsmain/members/${props.memId}`}>
              <button>Edit</button>
            </Link>
          ) : (
            ""
          )}
          {permArr.indexOf("delete subscriptions") > -1 ? (
            <button onClick={deleteMember}>Delete</button>
          ) : (
            ""
          )}
        </li>
        {/* <div><MoviesWatched id={props.memId}/></div>  */}
      </div>
      <div>
        <div>{finalArr.length > 0 ? "Movies Watched:" : ""}</div>
        <div>
          <ul className="member-movies-ul">{subscriptions}</ul>
        </div>
        <div>
          {isClicked ? (
            ""
          ) : (
            <button onClick={setClick}>Subscribe to new movie </button>
          )}
          {isClicked ? (
            <div>
              <AddSub userId={props.memId} movies={props.movies} />
              <button onClick={setClick}>Cancel</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <Switch>
          <Route
            exact
            path="/home/subsmain/members/:id"
            component={EditMember}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Member;
