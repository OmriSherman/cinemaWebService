import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import EditUser from "./EditUser";
import styles from './AlignLeft.module.css'

const User = (props) => {
  const [user, setUser] = useState({});
  const newArr = props.data.permissions.join();
  console.log(props.data);

  let deleteUser = async () => {
    await axios.delete(`http://localhost:8000/users/${props.data.userId}`);
    await axios.delete(`http://localhost:8000/usersjson/${props.data.userId}`);
    await axios.delete(
      `http://localhost:8000/permissions/${props.data.userId}`
    );
    alert("removed " + props.data.username);
    window.location.href="/home/usersmain/users";
  };

  let userObj = {
    id:props.data.userId,
    fname: props.data.fname,
    lname: props.data.lname,
    timeout: props.data.timeout,
    created: props.data.created,
    permissions: newArr
  }
  console.log(userObj);

  return (
    <div className={styles.alignleft}>
      <div className={styles.alignContent}>
      <li key={props.data.userId}>
        Name:{props.data.fname} {props.data.lname}
      </li>
      <li>User Name: {props.data.username}</li>
      <li>Session timeout (Minutes): {props.data.timeout}</li>
      <li>Created Date: {props.data.created}</li>
      <li>Permissions: {newArr}</li>
      <Link to={`/home/usersmain/users/${props.data.userId}`}>
        <button>Edit</button>
      </Link>
      <button onClick={deleteUser}>Delete</button>
      </div>

      <div>
        <Switch>
          <Route exact path="/home/usersmain/users/:id" component={EditUser} />
        </Switch>
      </div>
    </div>
  );
};

export default User;
