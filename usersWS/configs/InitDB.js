let usersBLFunctions = require('../models/users/usersBL');

if(usersBLFunctions.getUserById("60c1caea913286547c0ebd0b") == null)
{
let adminObj = {
    username: "admin",
    password: "admin"
}
usersBLFunctions.addUser(adminObj);
}