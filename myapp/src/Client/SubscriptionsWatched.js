import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubscriptionsWatched = (props) => {
  const [subId, setId] = useState(props.memId);
  const [subData, setData] = useState([]);
  const [memberData, setMemberData] = useState("");
  const [memName, setMemName] = useState("");

  useEffect(async () => {
    let data = await axios.get(`http://localhost:8001/subs/${subId}`);
    setData(data.data);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/mems/${subData.memberId}`)
      .then((data) => setMemberData(data.data.name));
  }, [subData]);

  let items = () => {
    let memName;
    let movieDate;
    if (subData) {
      memName = memberData;
      if (subData.movies && subData.movies[0]) {
        movieDate = subData.movies[0].date;
      }
    }
    return (
      <li>
        <Link to={`/home/subsmain/members/${subData.memberId}`}>{memName}</Link>
        , {movieDate}
      </li>
    );
  };
  return (
    <div>
      <ul> {items()}</ul>
    </div>
  );
};

export default SubscriptionsWatched;
