import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./EditMovie.module.css";
import { Link } from "react-router-dom";

const EditMember = () => {
  const memId = useState(useParams().id);
  const [user, setUser] = useState([]);
  const [newData, setData] = useState([]);

  useEffect(() => {
    let getData = () => {
      console.log(memId);
      axios.get(`http://localhost:8001/mems/${memId[0]}`)
      .then((data) => {
      setUser(data.data);
      setData(data.data);
      })
    };
    getData();
  }, []);

  let updateMember = () => {
    console.log("dd");
    let updatedObj = {
      name: newData.name,
      email: newData.email,
      city: newData.city,
    };

    console.log(updatedObj);
    axios.put(`http://localhost:8001/mems/${memId[0]}`, updatedObj);

    alert(newData.name +" has been updated!")
    window.location.href="/home/subsmain/members";
  };
  return (
    <div>
      <h2>Update: {user.name}</h2>
      Name:{" "}
      <input
        defaultValue={user.name}
        onChange={(e) =>
          setData((newData) => ({ ...newData, name: e.target.value }))
        }
      />
      <br />
      email:{" "}
      <input
        defaultValue={user.email}
        onChange={(e) =>
          setData((newData) => ({ ...newData, email: e.target.value }))
        }
      />
      <br />
      City:{" "}
      <input
        defaultValue={user.city}
        onChange={(e) =>
          setData((newData) => ({ ...newData, city: e.target.value }))
        }
      />
      <br />
      <button onClick={updateMember}>Update</button>
      <Link to="/home/subsmain/members">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default EditMember;
