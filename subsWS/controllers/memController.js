const { Router } = require('express');
var express = require('express');
var memsBL = require('../models/members/membersBL');
var appRouter = express.Router();

//Get All
appRouter.route('/').get(async(req,resp)=>{
    try{
        var mems = await memsBL.getAllMembers();
    }catch(e){
        console.log(e);
    }
    
    return resp.json(mems);
})

//Get By ID
appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var mem = await memsBL.getMemberById(id);
    return resp.json(mem);
})

//Add 
appRouter.route('/').post(async(req,resp)=>{
    var memData= req.body;
    var mem = await memsBL.addMember(memData);
    return resp.json(mem);
})

//Update 
appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var memObj = req.body;
    var mem = await memsBL.updateMember(id,memObj);
    return resp.json(mem);
})

//Delete 
appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var mem = await memsBL.deleteMember(id);
    return resp.json(mem);
})

module.exports = appRouter;