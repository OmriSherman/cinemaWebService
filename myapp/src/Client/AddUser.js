import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import styles from "./AddPages.module.css";

const AddUser = () => {
  const [currId, setCurrId] = useState("");
  const [userId, setId] = useState("");
  const [perArr, setArr] =useState([]);
  let res = [];
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    sessionTimeOut: "",
    permissions: [""],
  });
  const [userFromDb, setDbUser] = useState({
    id: "",
    permissions: [""],
  });

  let handleCheckBox = (e) => {
    let newArr = [];
    newArr = [...perArr];
    if (e.target.checked) {
      newArr.push(e.target.value);
    } else {
      const index = perArr.indexOf(e.target.value);
      if (index > -1);
      newArr.splice(index, 1);
    }
    console.log(newArr);
    setArr(newArr);
  };

  let saveUserToDB = async () => {
    let userObj = {
      username: user.username,
      password: "",
    };
    res = await axios.post("http://localhost:8000/users/", userObj);
    console.log(res.data._id);
    setCurrId(res.data._id);
    alert(user.username + " has been added!");
    window.location.href="/home/usersmain/users";
  };

  useEffect(() => {
    if (currId) {
      console.log(currId);
      setDbUser((user) => ({ ...user, permissions: perArr, id: currId }));
      console.log("Success");
    }
  }, [currId]);

  // useEffect(() => {
  //   if (user) {
  //     console.log('from user-useeffect');
  //     console.log(user);
  //   }
  // }, [user]);

  useEffect(() => {
    if (userFromDb) {
      console.log('from userFromDb');
      console.log(userFromDb);
      let newUser = {...user, ...userFromDb};
       console.log('newUser');
      console.log(newUser);

      var d = new Date();
      var formattedDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();

      axios.post('http://localhost:8000/permissions/',userFromDb);

      let userJsonObj = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdDate: formattedDate,
        sessionTimeOut: newUser.sessionTimeOut
      }
      axios.post('http://localhost:8000/usersjson/',userJsonObj);
    } 
  }, [userFromDb]);

  let addUserNameToDb = () => {
    let userObj = {
      username: user.userName,
      password: "",
    };
    axios
      .post("http://localhost:8000/users/", userObj)
      .then((data) => setCurrId(data.data._id));

      
  };

  return (
    <div className={styles.secondSectionWrapper}>
      <div className={styles.formWrapper}>
        <h2>Add User</h2>
        <br />
        <div>
          <div className={styles.userFormInput}>
            First Name:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, firstName: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            Last Name:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, lastName: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            User Name:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, username: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            Session time out:
            <input
              onChange={(e) =>
                setUser((user) => ({ ...user, sessionTimeOut: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <div>
            <div className={styles.perm}>Permissions:</div>
          </div>
          <div>
            <input
              type="checkbox"
              value="create subscriptions"
              onChange={handleCheckBox}
            />
            Create Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              value="delete subscriptions"
              onChange={handleCheckBox}
            />
            Delete Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              value="update subscriptions"
              onChange={handleCheckBox}
            />
            Update Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              value="view subscriptions"
              onChange={handleCheckBox}
            />
            View Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              value="create movies"
              onChange={handleCheckBox}
            />
            Create Movies
          </div>
          <div>
            <input
              type="checkbox"
              value="create movies"
              onChange={handleCheckBox}
            />
            View Movies
          </div>
          <div>
            <input
              type="checkbox"
              value="delete movies"
              onChange={handleCheckBox}
            />
            Delete Movies
          </div>
          <div>
            <input
              type="checkbox"
              value="update movies"
              onChange={handleCheckBox}
            />
            Update Movies
          </div>
        </div>
        <div>
          <button className={styles.buttonSize} onClick={saveUserToDB}>
            Save
          </button>
          <Link to="/home/usersmain/users"><button className={styles.buttonSizeRight}>Cancel</button></Link>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
