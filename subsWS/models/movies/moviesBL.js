var Movie = require('./movieSchema');

var getAllMovies = () => {
    return new Promise((resolve,reject) =>{
    Movie.find({}, (err,data)=>{
        if(err){
            reject(err);
        } else resolve(data);
    })
    })
}

var getMovieById = (id) => {
    return new Promise((resolve,reject)=>{
        Movie.findById((id), (err,data)=>{
            if(err){
                reject(err);
            } else resolve(data);
        })
    })

}

var addMovie = (newMovie) => {
    return new Promise((resolve,reject)=>{
        var movie = new Movie({
             name: newMovie.name, 
            genres: newMovie.genres, 
            image: newMovie.image.original,
            premiered: newMovie.premiered
            //Will not work as long as Date is date type in the schema
        })
        movie.save((err)=>{
            if(err){
                reject(err);
            } else {
                resolve(movie);
            }
        })
    })

}

var updateMovie = (movieId, newData) => { 
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndUpdate(movieId,{
            name: newData.name,
            genres: newData.genres,
            image: newData.image.original,
            premiered: newData.premiered
        },(err)=>{
            if(err){
                reject(err);
            } else {
                resolve("movie updated!");
            }
        })
    })

}

var deleteMovie = (id) => { 
    return new Promise((resolve,reject)=> {
        Movie.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else resolve("movie deleted!");
        })
    })

}
module.exports = {getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie};