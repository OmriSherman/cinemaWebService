import React, { useEffect, useState } from "react";
import styles from "./CreateAccount.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");
  const [userData, setData] = useState([]);
  const [userId, setId] = useState("");

  useEffect(() => {
    const usersData = axios
      .get("http://localhost:8000/users")
      .then((data) => setData(data.data));
  }, []);

  let createAcc = () => {
    const found = userData.findIndex((user) => user.username == userName);
    console.log(found);
    if (found >= 0) {
      setId(userData[found]._id);
      updatePass();
    } else {
      alert("User not Authorized!");
    }
  };

  let updatePass = async () => {
    let obj = {
      username: userName,
      password: pass,
    };
    await axios.put(`http://localhost:8000/users/${userId}`, obj);
    alert("created!");
    window.location.href="/"
  };

  return (
    <div style={{ height: "100%" }}>
      <h3>Create an Account</h3>
      <div className={styles.gridcontainer}>
        <div>
          <input
            className={styles.griditem}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username..."
          ></input>
        </div>
        <div>
          <input
            type="password"
            className={styles.griditem}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password..."
          ></input>
        </div>
        <br />
        <div>
          <button
            className={(styles.griditem, styles.button)}
            onClick={createAcc}
          >
            Create
          </button>
          <Link to="/">
            <button className={(styles.griditem, styles.button)}>Return</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
