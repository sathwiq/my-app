const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var express = require('express'),
    bodyParser  = require("body-parser"),
    app = express();
app.use(bodyParser.urlencoded({extended: true}));
var cors = require('cors')
var corsOptions = {
  origin: true
  }

 
var user = {"name":"azraq","country":"egypt"};
// Then pass them to cors:
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
    console.log("hi")
    
    var json = JSON.stringify(user);
    var filename = 'user.json';
    var mimetype = 'application/json';
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-disposition','attachment; filename='+filename);
    res.send( json );
    return 1
})
app.post("/",(req,res)=>{
    console.log(req.body.data)
    user=req.body.data
    res.send('hi')
    return 1
})
exports.app = functions.https.onRequest(app);