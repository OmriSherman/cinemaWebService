import React from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import AddUser from './AddUser';
import AllUsers from './AllUsers';
import EditUser from './EditUser';
import styles from './MainPages.module.css'

const UsersMain = () => {
    return (
        <div className={styles.secondSection}>
            <div className={styles.secondSectionTitle}>Users</div>
            <Link to="/home/usersmain/users"><button className={styles.subbutton}>All Users</button></Link>
            <Link to="/home/usersmain/adduser"><button className={styles.subbutton}>Add Users</button></Link>


            <Switch>
            <Route exact path="/home/usersmain/users" component={AllUsers}/>
            <Route exact path="/home/usersmain/adduser" component={AddUser}/>
            <Route exact path="/home/usersmain/users/:id" component={EditUser} />
            </Switch>
        </div>
    );
};

export default UsersMain;