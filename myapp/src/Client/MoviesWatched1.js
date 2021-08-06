import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AddSub from "./AddSub";
import Movie from "./Movie";

const MoviesWatched = (props) => {
  const [subsData, setSubsData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [isClicked, setClicked] = useState(0);
  const [final, set] = useState([{}]);

  useEffect(async () => {
    axios.get("http://localhost:8001/subs").then((data) => setSubsData(data.data));
  }, []);

  useEffect(() => {
    var movieNamesArr = [];
    var finalArr = [{}];

    for (let i = 0; i < subsData.length; i++) {
      axios
        .get(`http://localhost:8001/movies/${subsData[i].movies[0].movieId}`)
        .then((data) => movieNamesArr.push(data.data.name));
    }
    console.log(movieNamesArr);

    if(movieNamesArr) {
      let dateArr=[];
      for (let i = 0; i < subsData.length; i++) {
       if(subsData[i].memberId == props.id) {
         let finalObj = {
        name: movieNamesArr[i],
        date: subsData[i].movies[0].date
       }
        finalArr.push(finalObj)
      }
    }
    console.log(finalArr);
  }
    let subs = subsData;
    var currMovieName = [];
    var movieNamesArr = [];
    var datesArr = [];
    var finalArray = [];
    for (let i = 0; i < subs.length; i++) {
      let subMemId = subs[i].memberId;
      if (props.id == subMemId) {
        datesArr.push(subs[i].movies[0].date);
        currMovieName.push(subs[i].movies[0].movieId);


      }
    }
    for (let i = 0; i < currMovieName.length; i++) {
      axios
        .get(`http://localhost:8001/movies/${currMovieName[i]}`)
        .then((data) => movieNamesArr.push(data.data.name));

        if(movieNamesArr) {
        for (let i = 0; i < movieNamesArr.length; i++) {
          console.log("hh");
        let finalObj = {
          name: movieNamesArr[i],
          date: datesArr[i]
        }
        finalArray.push(finalObj);
    }
  }
  }
    console.log(finalArray);
  }, [subsData]);

  // let subscriptions = movieNames.map((name) => {
  //   console.log(movieNames);
  //   return <li>{name}</li>
  // })

  let setClick = () => {
    setClicked((isClicked) => !isClicked);
  };

  let subscriptions = () => {
    for (let i = 0; i < final?.length; i++) {
     return <li>{final[i]}, {final[i*2]}</li>
    }
  }

  return (
     <div>
       <div>Movies Watched</div>
       
         {isClicked ? (
          ""
        ) : (
          <button onClick={setClick}>Subscribe to new movie</button>
        )}
        {isClicked ? (
          <div>
            <AddSub userId={props.id} />
            <button onClick={setClick}>Cancel</button>
          </div>
        ) : (
          ""
        )}
        <div>
          <ul>{subscriptions()}</ul>
        </div>
      </div>
  );
};

export default MoviesWatched;
