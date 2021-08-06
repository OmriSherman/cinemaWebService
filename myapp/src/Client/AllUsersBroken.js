import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

const AllUsers = () => {
  const [userJsonData, setUserJsonData] = useState([]);
  const [permissionJsonData, setPermissionJsonData] = useState([]);
  const [userDbData, setUserDbData] = useState([]);

  const fetchDbData = async () => {
    let userDb = await axios.get("http://localhost:8000/users/");
    setUserDbData(userDb.data);
  };
  const fetchUsersData = async () => {
    let userDetails = await axios.get("http://localhost:8000/usersjson/");
    setUserJsonData(userDetails.data.users);
  };
  const fetchPermissionData = async () => {
    let userPerm = await axios.get("http://localhost:8000/permissions/");
    setPermissionJsonData(userPerm.data.permissions);
  };
  useEffect(() => {
    fetchDbData();
    fetchUsersData();
    fetchPermissionData();
  }, []);
  let items = userDbData.forEach((user) => {
    let id = user._id;
    // console.log(id);
    console.log(userJsonData);
    let username = user.username;
    let userData = userJsonData.find((userJ) => userJ.id == id);
    // console.log(userData)
    let permissionData = permissionJsonData.find((userP) => userP.id == id);

    let finalObj = {
      lname: userData.firstName,
      fname: userData.lastName,
      username: username,
      timeout: userData.sessionTimeOut,
      created: userData.createdDate,
      permissions: permissionData.permissions,
    };

    return <User data={finalObj} />;
  });

  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
};

export default AllUsers;
