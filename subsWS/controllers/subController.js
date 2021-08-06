const { Router } = require('express');
var express = require('express');
var subsBL = require('../models/subscriptions/subscriptionsBL');
var appRouter = express.Router();

//Get All
appRouter.route('/').get(async(req,resp)=>{
    try{
        var subs = await subsBL.getAllSubs();
    }catch(e){
        console.log(e);
    }
    
    return resp.json(subs);
})

//Get By ID
appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var sub = await subsBL.getSubById(id);
    return resp.json(sub);
})

//Add 
appRouter.route('/').post(async(req,resp)=>{
    var subData= req.body;
    var sub = await subsBL.addSub(subData);
    return resp.json(sub);
})

//Update 
appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var subObj = req.body;
    var sub = await subsBL.updateSub(id,subObj);
    return resp.json(sub);
})

//Delete 
appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var sub = await subsBL.deleteSub(id);
    return resp.json(sub);
})

module.exports = appRouter;