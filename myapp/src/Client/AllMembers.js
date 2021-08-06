import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllMovies.module.css";
import alignLeft from "./AlignLeft.module.css";
import Member from "./Member";
import Ul from '@material-ui/core/ListItem';

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/mems")
      .then((data) => setMembers(data.data));

    axios.get("http://localhost:8001/movies").then((data) => {
      setMovies(data.data);
    });
  }, []);

  let items = members.map((member, index) => {
    return (
      <Member
        movies={movies}
        key={index + 1}
        memEmail={member.email}
        memName={member.name}
        memId={member._id}
      />
    );
  });
  return (
    <div>
      <div className={alignLeft.alignleft}>
        <ul>{items}</ul>
      </div>
    </div>
  );
};

export default AllMembers;
