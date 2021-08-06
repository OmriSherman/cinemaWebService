import React,  {useEffect, useState} from 'react';
import {Switch, Link, Route} from 'react-router-dom'
import AllMembers from './AllMembers'
import EditMember from "./EditMember";
import addMember from './AddMember'
import AddSub from './AddSub';
import axios from 'axios'
import styles from './MainPages.module.css'

const MoviesMain = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [permArr, setPermArr] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/permissions/${userId}`)
        .then((data) => setPermArr((data.data.permissions)));
    },[])

    return (
        <div className={styles.secondSection}>
            <div className={styles.secondSectionTitle}>Subscriptions</div>
            {(permArr.indexOf("view subscriptions") > -1 ?
            <Link to="/home/subsmain/members"><button className={styles.subbutton}>All Members</button></Link>
            : '')}
            {(permArr.indexOf("create subscriptions") > -1 ?
            <Link to="/home/subsmain/addmember"><button className={styles.subbutton}>Add Member</button></Link>
            : '')}
            <Switch>
            <Route exact path="/home/subsmain/members" component={AllMembers}/>    
            <Route exact path="/home/subsmain/members/:id" component={EditMember}/>    
            <Route exact path="/home/subsmain/addmember" component={addMember}/>
            <Route exact path="/home/subsmain/members/subs/addsub/:id" component={AddSub}/>    
            </Switch>
        </div>
    );
};

export default MoviesMain;