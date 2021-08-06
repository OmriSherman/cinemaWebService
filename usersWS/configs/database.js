var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UsersDB',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})