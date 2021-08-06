import {React, useState, useEffect}  from 'react';
import {Switch, Link, Route} from 'react-router-dom'
import AddMovie from './AddMovie';
import AllMovies from './AllMovies';
import EditMovie from './EditMovie';
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
            <div className={styles.secondSectionTitle}>Movies</div>
            {(permArr.indexOf("view movies") > -1 ?
            <Link to="/home/moviesmain/movies"><button className={styles.subbutton}>All movies</button></Link>
            : '')}
            {(permArr.indexOf("create movies") > -1 ?
            <Link to="/home/moviesmain/addMovie"><button className={styles.subbutton}>Add Movie</button></Link>
            : '')}

            <Switch>
            <Route exact path="/home/moviesmain/movies" component={AllMovies}/>    
            <Route exact path="/home/moviesmain/movies/:id" component={EditMovie}/>    
            <Route exact path="/home/moviesmain/addMovie" component={AddMovie}/>    
            </Switch>
        </div>
    );
};

export default MoviesMain;