require ('dotenv').config()
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var userController = require ('./controllers/userController')
var userJsonController = require('./controllers/usersJsonController')
var permissionJsonController = require('./controllers/permissionJsonController')
var app = express();
var jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const { response } = require('express');
require('./configs/database');
//require('./configs/InitDB');



app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use('/users',userController);
app.use('/usersjson',userJsonController);
app.use('/permissions', permissionJsonController)

app.post('/login', (req,res)=> {
    const currId = req.body._id;
    const username = req.body.username;
    axios.get((`http://localhost:8000/users/${req.body._id}`),(err,result) => {
        if(err) { res.send({err: err});}
    bcrypt.compare(username, (err, response) => {
        if (response) {
            const id = response.data._id
            const token = jwt.sign({id}, "jwtSecret", {
                expiresIn: 300,
            })
            req.session.user = result;

            res.json({auth: true, token: token, result: result});
        } else {
            res.send({message: "user does not exist!"})
        }
        });
    })
})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        res.send("please give a token"  )
    } else {
        jwt.verify(token, "jwtSecret", (err,decoded) => {
            if(err) {
                res.json({auth: false, message: "authentication failed"})
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req,res) => {
    res.send("you are authorized")
})


app.listen(8000,()=>{
    console.log("server is up");
})