var usersJsonBL = require ('../models/usersJSON/usersJsonBL')
var express = require('express');
var appRouter = express.Router();

appRouter.route('/').get(async(req,resp)=>{
    try{
        var users = await usersJsonBL.readFromFile();
    } catch(e) {
        console.log(e);
    }
    return resp.json(users);
})

appRouter.route('/').post(async(req,resp)=>{
    var userData= req.body;
    var user = await usersJsonBL.writeToFile(userData);
    return resp.json(user);
})

appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var user = await usersJsonBL.getUserById(id);
    return resp.json(user);
})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var user = await usersJsonBL.deleteFromFile(id);
    return resp.json(user);
})

appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var userObj = req.body;
    var user = await usersJsonBL.updateUserFromFile(id,userObj)
    return resp.json(user);
})


module.exports = appRouter;