// /app/controllers/urlController.server.js
'use strict';

// Set up ----------------------------------------------------------------------
var Urls = require('../models/urls.js');


// Main export class -----------------------------------------------------------
function UrlHandler () {

  // Add method ----------------------------------------------------------------
  this.add = function (req, res) {

    // Settings ------------------------------------------------------------//
    var host = req.headers.host;
    var inputUrlFull = req.params['urlFull'] + req.params['0'];


    // Input error checking ------------------------------------------------//
    // Reject if the inputUrl is does not match http uri Format
    var urlCheck = /^(?:https?\:\\\\)?(?:.*\.)?.*\..*$/.exec(inputUrlFull)
    if (urlCheck === null) {
      res.status(500).send({ error: 'You entered an unacceptable url!' });
    }
    else {

    // Main ----------------------------------------------------------------//
    Urls.findOne (
      { urlFull: inputUrlFull },
      function (err, url) {
        if (err)
          throw err;
        else if (url)
          res.json(returnJSON(url.urlFull, url.urlId)); // Send response
        else
          addUrl();
      }
    );


    // Method: adding url --------------------------------------------------//
    function addUrl() {
      Urls.count({}, function(err, count) {
        if (err) throw err;
        var newUrl = new Urls();
        newUrl.urlId = count;
        newUrl.urlFull = inputUrlFull;
        newUrl.save(function(err) {
          if (err)
            throw err;
          res.json(returnJSON(inputUrlFull, count)); // Send response
        });
      });
    }


    // Method: return JSON -------------------------------------------------//
    /* Example:
      { "original_url": "http://freecodecamp.com/news",
        "short_url": "https://shurli.herokuapp.com/4" }
     */
    function returnJSON(url_full, url_id) {
      var newObj = {};
      newObj.original_url = url_full;
      newObj.short_url = host + '/' + url_id;
      return newObj;
    }
  }


  };  // End add method --------------------------------------------------------


  // Redirect method -----------------------------------------------------------
  this.redirect = function (req, res) {

    // Settings ------------------------------------------------------------//
    var inputUrlId = req.params['id'];

    // Main ----------------------------------------------------------------//
    Urls.findOne (
      { urlId: inputUrlId },
      function (err, urlId) {
        if (err) throw err;
        else if (urlId) {
          var httpCheck = /^(?:https?\:\\\\)/.exec(urlId.urlFull);
          if (httpCheck === null)
            res.redirect('http://'+urlId.urlFull);
          res.redirect(urlId.urlFull);
        }
        else res.send("The shortened URL not found");
      }
    );


  };  // End redirect method ---------------------------------------------------

};


// Export the handler class ----------------------------------------------------
module.exports = UrlHandler;


// EOF -------------------------------------------------------------------------
