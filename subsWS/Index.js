var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var memController = require ('./controllers/memController');
var movieController = require('./controllers/movieController');
var subController = require('./controllers/subController');
var app = express();

require("./configs/database");
//require("./configs/initDB");


app.use(cors());
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json());
app.use('/mems',memController);
app.use('/movies',movieController);
app.use('/subs',subController);

app.listen(8001,()=>{
    console.log("server is up");
})