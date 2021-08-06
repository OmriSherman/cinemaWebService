var mongoose = require('mongoose');

var appSchema = mongoose.Schema;
var userSchema = new appSchema({
    username: String,
    password: String
})
module.exports = mongoose.model('users',userSchema);