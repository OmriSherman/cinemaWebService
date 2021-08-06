// import axios
// fetch data using axios movies \ members
//load add data function from the proper BL module
let axios  = require('axios')
let usersBLFunctions = require('../models/members/membersBL');
let moviesBLFunctions = require('../models/movies/moviesBL');

let membersDataPromise = axios.get("https://jsonplaceholder.typicode.com/users")
membersDataPromise.then((usersData)=>{
    
    for(let i = 0 ; i < usersData.data.length; i++){
        usersBLFunctions.addMember(usersData.data[i])
    } 
})

let moviesDataPromise = axios.get("https://api.tvmaze.com/shows")
moviesDataPromise.then((moviesData)=>{
    
    for(let i = 0 ; i < moviesData.data.length; i++){
        moviesBLFunctions.addMovie(moviesData.data[i]);
    } 
})

