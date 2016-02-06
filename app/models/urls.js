// app/models/urls.js
'use strict';

// Set up ----------------------------------------------------------------------
var mongoose = require('mongoose');


// Mongoose schema -------------------------------------------------------------
var urlSchema = mongoose.Schema({
    urlId   : Number,
    urlFull : String,
});


// Export the handler class ----------------------------------------------------
module.exports = mongoose.model('Urls', urlSchema);


// EOF -------------------------------------------------------------------------
