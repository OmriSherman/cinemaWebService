var User = require('./userSchema');
var fs = require('fs');
const { resolve } = require('path');

var getAllUsers = () => {
    return new Promise((resolve,reject) =>{
    User.find({}, (err,data)=>{
        if(err){
            reject(err);
        } else resolve(data);
    })
    })
}

var getAllUsersFromJson = () => {
    return new Promise((resolve,reject) =>{
    fs.readFile("../usersWS/JsonFiles/usersJSON/users.json", (err, data) => {
        if (err) {
            reject(err);
        } else  {
            resolve(JSON.parse(data)); }
    });
})
}

var getUserById = (id) => {
    return new Promise((resolve,reject)=>{
        User.findById((id), (err,data)=>{
            if(err){
                reject(err);
            } else resolve(data);
        })
    })

}

var getUser = (name) => {
    return new Promise((resolve,reject)=>{
        User.fi((name), (err,data)=>{
            if(err){
                reject(err);
            } else resolve(data);
        })
    })
    return data._id;
}

var addUser = (newUser) => {
    return new Promise((resolve,reject)=>{
        var user = new User({
            username: newUser.username,
            password: newUser.password
        })
        user.save((err)=>{
            if(err){
                reject(err);
            } else {
                resolve(user);
            }
        })
    })

}

var updateUser = (userId, newData) => { 
    return new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(userId,{
            username: newData.username,
            password: newData.password
        },(err)=>{
            if(err){
                reject(err);
            } else {
                resolve("User updated!");
            }
        })
    })

}

var deleteUser = (id) => { 
    return new Promise((resolve,reject)=> {
        User.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else resolve("User deleted!");
        })
    })

}
module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser, getAllUsersFromJson};