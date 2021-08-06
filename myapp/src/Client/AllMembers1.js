import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllMovies.module.css";
import alignLeft from "./AlignLeft.module.css";
import Member from './Member'

const AllMembers = () => {
  
  axios.get("http://localhost:8001/mems").
  then ((data) =>setMembers(data.data));

  useEffect(() => {

  }, []);

  let items = members.map((member) => {
       return(
        <Member memEmail={member.email} memName={member.name} memId={member._id}/> 
      ); 
  });
  return (
    <div className={alignLeft.alignleft}>
      <ul>
        {items}
        </ul>

    </div>
  );
};

export default AllMembers1;
