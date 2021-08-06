import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import styles from "./AddMovie.module.css";

const AddMember = () => {
    const [newMember, setMember] = useState({name:"" , email:"", city:""})

    let addMemberToDB = () => {
        let userObj = {
            name : newMember.name,
            email : newMember.email,
            address: {
               city: newMember.city
            } 
        }
        console.log(userObj);
        axios.post("http://localhost:8001/mems",userObj)

        alert(newMember.name + " has been added")
        window.location.href="/home/subsmain/members";
    };
    return (
        <div>
        <div className={styles.gridcontainer}>
            Name: <input  className={styles.gridcell}onChange={(e)=>setMember((newMember)=>({...newMember,name: e.target.value}))}/>
            Email: <input  className={styles.gridcell}onChange={(e)=>setMember((newMember)=>({...newMember,email: e.target.value}))}/>
            City: <input  className={styles.gridcell}onChange={(e)=>setMember((newMember)=>({...newMember,city: e.target.value}))}/>
            </div>
            <div>
            <button className={styles.btnmargin} onClick={addMemberToDB}>Add</button>
            <Link to="/home/subsmain/members"><button className={styles.btnmargin}>Cancel</button></Link>
            </div>
        </div>
    );
};

export default AddMember;