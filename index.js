const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

// set up express app
const app = express();

// connect to mongodb


var mongourl_mlab = "mongodb://carfromjapanuser:Thuhuyen192@ds143030.mlab.com:43030/carfromjapanmg";
var mongourl_local = "mongodb://localhost/carfromjapan";
mongoose.connect(mongourl_mlab);
mongoose.Promise = global.Promise;


//set up static files
app.use(cors());
app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});


// listen for requests
app.listen(process.env.PORT || 4000, function(){
    console.log('listening for requests at port 4000');
});