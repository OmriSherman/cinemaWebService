var permissionsJsonBL = require ('../models/permissionsJSON/permissionsJsonBL')
var express = require('express');
var appRouter = express.Router();

appRouter.route('/').get(async(req,resp)=>{
    try{
        var permissions = await permissionsJsonBL.readFromFile();
    } catch(e) {
        console.log(e);
    }
    return resp.json(permissions);
})
module.exports = appRouter;

appRouter.route('/').post(async(req,resp)=>{
    var userData= req.body;
    var permission = await permissionsJsonBL.writeToFile(userData);
    return resp.json(permission);
})

appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var permission = await permissionsJsonBL.getPermissionById(id);
    return resp.json(permission);
})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id;
    var user = await permissionsJsonBL.deleteFromFile(id);
    return resp.json(user);
})

appRouter.route('/:id').put(async(req,resp)=>{
    var id = req.params.id;
    var userObj = req.body;
    var user = await permissionsJsonBL.updateUserFromFile(id,userObj)
    return resp.json(user);
})
