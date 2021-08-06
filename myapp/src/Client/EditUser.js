import React, { useEffect, useState } from "react";
import styles from "./AddPages.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const EditUser = () => {
  const [userId, setUser] = useState(useParams().id);
  const [userName, setUserName] = useState([]);
  const [userObj, setObj] = useState({});
  const [perArr, setArr] = useState([]);
  const permArr = [];

  useEffect(async () => {
    let userJsonData = (
      await axios.get(`http://localhost:8000/usersjson/${userId}`)
    ).data;
    let userName = (await axios.get(`http://localhost:8000/users/${userId}`))
      .data;
    let userJsonPerm = (
      await axios.get(`http://localhost:8000/permissions/${userId}`)
    ).data;

    setObj((userObj) => ({
      ...userObj,
      firstName: userJsonData.firstName,
      lastName: userJsonData.lastName,
      createdDate: userJsonData.createdDate,
      userName: userName.username,
      sessionTimeOut: userJsonData.sessionTimeOut,
      permissions: userJsonPerm.permissions,
    }));
    console.log(userObj);
  }, []);

  const editUser = async() => {
    console.log(userObj);

    let permissionObj = {
      id: userId,
      permissions: userObj.permissions
    };

    let usersJsonObj = {
      id: userId,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      createdDate: userObj.createdDate,
      sessionTimeOut: userObj.timeOut
    };

    let userDbObj = {
      username: userObj.userName,
      password: userName.password
    }
    console.log(userId);
    await axios.put(`http://localhost:8000/permissions/${userId}`, permissionObj);
    await axios.put(`http://localhost:8000/usersjson/${userId}`, usersJsonObj);
    await axios.put(`http://localhost:8000/users/${userId}`, userDbObj);

    alert (userObj.firstName + " has been updated!")
    window.location.href="/home/usersmain/users";
  };

  let handleCheckBox = (e) => {
    if (userObj.permissions) {
      let newArr = [];
      newArr = [...userObj.permissions];
      if (e.target.checked) {
        newArr.push(e.target.value);
      } else {
        const index = userObj.permissions.indexOf(e.target.value);
        if (index > -1);
        newArr.splice(index, 1);
      }
      console.log(newArr);
      setObj({ ...userObj, permissions: newArr });
    }
  };

  return (
    <div className={styles.secondSectionWrapper}>
      <div className={styles.formWrapper}>
        <h2>
          Edit User: {userObj.firstName} {userObj.lastName}{" "}
        </h2>
        <br />
        <div>
          <div className={styles.userFormInput}>
            First Name:
            <input
              defaultValue={userObj.firstName}
              onChange={(e) =>
                setObj((userObj) => ({ ...userObj, firstName: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            Last Name:
            <input
              defaultValue={userObj.lastName}
              onChange={(e) =>
                setObj((userObj) => ({ ...userObj, lastName: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            Created Date:
            <input
              defaultValue={userObj.createdDate}
              readOnly
              onChange={(e) =>
                setObj((userObj) => ({
                  ...userObj,
                  createdDate: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            User Name:
            <input
              defaultValue={userObj.userName}
              onChange={(e) =>
                setObj((userObj) => ({ ...userObj, userName: e.target.value }))
              }
            />
          </div>
          <div className={styles.userFormInput}>
            Session time out:
            <input
              defaultValue={userObj.sessionTimeOut}
              onChange={(e) =>
                setObj((userObj) => ({ ...userObj, timeOut: e.target.value }))
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
              checked={
                userObj.permissions?.indexOf("create subscriptions") > -1
              }
              value="create subscriptions"
              onChange={handleCheckBox}
            />
            Create Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              checked={
                userObj.permissions?.indexOf("delete subscriptions") > -1
              }
              value="delete subscriptions"
              onChange={handleCheckBox}
            />
            Delete Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              checked={
                userObj.permissions?.indexOf("update subscriptions") > -1
              }
              value="update subscriptions"
              onChange={handleCheckBox}
            />
            Update Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              checked={userObj.permissions?.indexOf("view subscriptions") > -1}
              value="view subscriptions"
              onChange={handleCheckBox}
            />
            View Subscriptions
          </div>
          <div>
            <input
              type="checkbox"
              checked={userObj.permissions?.indexOf("create movies") > -1}
              value="create movies"
              onChange={handleCheckBox}
            />
            Create Movies
          </div>
          <div>
            <input
              type="checkbox"
              checked={userObj.permissions?.indexOf("view movies") > -1}
              value="view movies"
              onChange={handleCheckBox}
            />
            View Movies
          </div>
          <div>
            <input
              type="checkbox"
              checked={userObj.permissions?.indexOf("delete movies") > -1}
              value="delete movies"
              onChange={handleCheckBox}
            />
            Delete Movies
          </div>
          <div>
            <input
              type="checkbox"
              checked={userObj.permissions?.indexOf("update movies") > -1}
              value="update movies"
              onChange={handleCheckBox}
            />
            Update Movies
          </div>
        </div>
        <div>
          <button className={styles.buttonSize} onClick={editUser}>
            Save
          </button>
          <Link to="/home/usersmain/users">
            <button className={styles.buttonSizeRight}>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
