var express = require('express');
var usersBL = require('../models/users/usersBL');
var appRouter = express.Router();
//Get All
appRouter.route('/').get(async(req,resp)=>{
    try{
        var users = await usersBL.getAllUsers();
    }catch(e){
        console.log(e);
    }
    
    return resp.json(users);
})

//Get By ID
appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var user = await usersBL.getUserById(id);
    return resp.json(user);
})

//Add User
appRouter.route('/').post(async(req,resp)=>{
    var userData= req.body;
    var user = await usersBL.addUser(userData);
    return resp.json(user);
})

//Update User
appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var userObj = req.body;
    var user = await usersBL.updateUser(id,userObj);
    return resp.json(user);
})

//Delete User
appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var user = await usersBL.deleteUser(id);
    return resp.json(user);
})

module.exports = appRouter;