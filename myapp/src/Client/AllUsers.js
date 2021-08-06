import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

const AllUsers = () => {
  const [userDbData, setDbData] = useState([]);
  const [userJsonData, setUsersData] = useState([]);
  const [permJsonData, setPermissionsData] = useState([]);
  const finalArr = [];

  useEffect(() => {
    axios.get("http://localhost:8000/usersjson/").then((data1) => {
      setUsersData(data1.data.users);
    });
    axios.get("http://localhost:8000/users/").then((data) => {
      setDbData(data.data);
    });
    axios.get("http://localhost:8000/permissions/").then((data2) => {
      setPermissionsData(data2.data.permissions);
    });
  }, []);

  if (
    userDbData.length > 0 &&
    userJsonData.length > 0 &&
    permJsonData.length > 0
  ) {
    userDbData.forEach((user) => {
      let id = user._id;
      let strId = id.toString();
      let username = user.username;
      let userData = userJsonData.find((userJ) => userJ.id == strId);
      let permData = permJsonData.find((userP) => userP.id == strId);

      if (userData) {
        let finalObj = {
          userId: strId,
          fname: userData.firstName,
          lname: userData.lastName,
          username: username,
          timeout: userData.sessionTimeOut,
          created: userData.createdDate,
          permissions: permData.permissions,
        };
        console.log(finalObj);
        finalArr.push(finalObj);
      }
    });
  }

  let items = finalArr.map((user) => {
    return <tr><User data={user} /></tr>
  });

  return (
    <div className="usersoverflow">
      <table><tbody>{items}</tbody></table>
    </div>
  );
};

export default AllUsers;
