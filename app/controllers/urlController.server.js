// /app/controllers/urlController.server.js
'use strict';

// Set up ----------------------------------------------------------------------
var Urls = require('../models/urls.js');


// Main export class -----------------------------------------------------------
function UrlHandler () {

  // Add method ----------------------------------------------------------------
  this.add = function (req, res) {

    //----------------------------------------------------------------------//
    // Settings
    var host = req.headers.host;
    var inputUrlFull = req.params['urlFull'] + req.params['0'];
    console.log(inputUrlFull);


    //----------------------------------------------------------------------//
    // Main
    Urls.findOne (
      { urlFull: inputUrlFull },
      function (err, url) {
        console.log('mongo url', url);

        if (err) throw err;
        else if (url) {

          // Send response
          //res.send("number of links: " + count);
          res.json(returnJSON(url.urlFull, url.urlId));

          /*
          Urls.count({}, function(err, count) {
            if (err) throw err;

          // -----------------------------------
            console.log("main url json", returnJSON(url.urlFull, url.urlId));
          // -----------------------------------

          }); */
        }
        else addUrl();
      }
    );


    //----------------------------------------------------------------------//
    // Method: adding url
    function addUrl() {
      console.log('add url');

      Urls.count({}, function(err, count) {
        if (err) throw err;
        var newUrl = new Urls();
        newUrl.urlId = count;
        newUrl.urlFull = inputUrlFull;
        newUrl.save(function(err) {
          if (err)
            throw err;

        // -----------------------------------
          console.log("add url json", returnJSON(inputUrlFull, count));
        // -----------------------------------

          // Send response
          //res.send("saved: " + inputUrlFull);
          res.json(returnJSON(inputUrlFull, count));

        });
      });

    }


    //--------------------------------------------------------------------------
    // Method: return JSON
    /* Example:
      { "original_url": "http://freecodecamp.com/news",
        "short_url": "https://shurli.herokuapp.com/4" }
     */
    function returnJSON(url_full, url_id) {
      var newObj = {};
      newObj.original_url = url_full;
      newObj.short_url = host + '/' + url_id; // need to add root
      return newObj;
    }


  };  // End add method ----------------------------------------------------- //


  // Redirect method -----------------------------------------------------------
  this.redirect = function (req, res) {

    //----------------------------------------------------------------------//
    // Settings
    var inputUrlId = req.params['id'];


    //----------------------------------------------------------------------//
    // Main
    Urls.findOne (
      { urlId: inputUrlId },
      function (err, urlId) {
        if (err) throw err;
        else if (urlId) {
          res.redirect(urlId.urlFull);
        }
        else res.send("The shortened URL not found");
      }
    );


  };  // End redirect method ------------------------------------------------ //

};


// Export the handler class ----------------------------------------------------
module.exports = UrlHandler;


// EOF -------------------------------------------------------------------------
