// /server.js
'use strict';

// Load packages ---------------------------------------------------------------
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');


// Setup node/express app ------------------------------------------------------
dotenv.load();
var app = express();
var routes = require('./app/index.js');
var port = process.env.PORT || 8080;
app.use(morgan('dev')); // log every request to the console


// Setp mongoose ---------------------------------------------------------------
mongoose.connect((process.env.MONGOLAB_URI || process.env.MONGO_URI) + "/url");


// Load routes -----------------------------------------------------------------
routes(app);


// HTML routes -----------------------------------------------------------------
app.use('/view', express.static(process.cwd() + '/view'));


// Start server ----------------------------------------------------------------
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


// EOF -------------------------------------------------------------------------
