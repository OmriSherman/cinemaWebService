var Sub = require('./subSchema');

var getAllSubs = () => {
    return new Promise((resolve,reject) =>{
    Sub.find({}, (err,data)=>{
        if(err){
            reject(err);
        } else resolve(data);
    })
    })
}

var getSubById = (id) => {
    return new Promise((resolve,reject)=>{
        Sub.findById((id), (err,data)=>{
            if(err){
                reject(err);
            } else resolve(data);
        })
    })

}

var addSub = (newSub) => {
    // movies: [{movieId : sub.movies.movieId, date : sub.movies.date}]}

    return new Promise((resolve,reject)=>{
        var sub = new Sub({
            memberId: newSub.memberId,
            movies: [{
                movieId: newSub.movies[0].movieId,
                date: newSub.movies[0].date
            }]
        })
        sub.save((err)=>{
            if(err){
                reject(err);
            } else {
                resolve(sub);
            }
        })
    })

}

var updateSub = (subId, newData) => { 
    return new Promise((resolve,reject)=>{
        Sub.findByIdAndUpdate(subId,{
            memberId: newData.memberId
            [{
                movieId: newData.movies.movieId,
                date: newData.movies.date
            }]
        },(err)=>{
            if(err){
                reject(err);
            } else {
                resolve("sub updated!");
            }
        })
    })

}

var deleteSub = (id) => { 
    return new Promise((resolve,reject)=> {
        Sub.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else resolve("sub deleted!");
        })
    })

}
module.exports = {getAllSubs,getSubById,addSub,updateSub,deleteSub};