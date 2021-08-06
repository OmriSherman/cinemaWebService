const { Router } = require('express');
var express = require('express');
var moviesBL = require('../models/movies/moviesBL');
var appRouter = express.Router();

//Get All
appRouter.route('/').get(async(req,resp)=>{
    try{
        var movies = await moviesBL.getAllMovies();
    }catch(e){
        console.log(e);
    }
    
    return resp.json(movies);
})

//Get By ID
appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var movie = await moviesBL.getMovieById(id);
    return resp.json(movie);
})

//Add 
appRouter.route('/').post(async(req,resp)=>{
    var movieData= req.body;
    var movie = await moviesBL.addMovie(movieData);
    return resp.json(movie);
})

//Update 
appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var movieObj = req.body;
    var movie = await moviesBL.updateMovie(id,movieObj);
    return resp.json(movie);
})

//Delete 
appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var movie = await moviesBL.deleteMovie(id);
    return resp.json(movie);
})

module.exports = appRouter;