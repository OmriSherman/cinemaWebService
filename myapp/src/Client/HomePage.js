import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import styles from "./HomePage.module.css";
import MoviesMain from "./MoviesMain";
import SubsMain from "./SubsMain";
import UsersMain from "./UsersMain";
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Main = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [permArr, setPermArr] = useState([]);

  let displayName = () => {
    let userName = localStorage.getItem("userName");
    return userName;
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/permissions/${userId}`)
      .then((data) => setPermArr(data.data.permissions));
  }, []);

  return (
    <div>
      <div className={styles.userName}>{displayName()}
      <Link exact to="/"><ExitToAppIcon className={styles.logout}/></Link>
      </div>
      <div className={styles.title}>Movies Subscriptions Site</div>
      <div className={styles.gridcontainer}>
        <div className={styles.griditem}>
          <Link to="/home/moviesmain">
            {" "}
            <button>Movies</button>
          </Link>
        </div>

        <div className={styles.griditem}>
          <Link to="/home/subsmain">
            <button>Subs</button>
          </Link>
        </div>
        <div className={styles.griditem}>
          <Link exact to="/">
            <button>Log Out</button>
          </Link>
        </div>
        {localStorage.getItem("userName") == "admin" ? (
          <div className={styles.griditem}>
            <Link to="/home/usersmain">
              <button>Manage Users</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <Switch>
          <Route path="/home/moviesmain" component={MoviesMain} />
          <Route path="/home/subsmain" component={SubsMain} />
          <Route path="/home/usersmain" component={UsersMain} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
