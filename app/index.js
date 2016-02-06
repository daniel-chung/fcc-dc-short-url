// /app/index.js
'use strict';

// Set up ----------------------------------------------------------------------
var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlController.server.js');


// Main index function ---------------------------------------------------------
module.exports = function (app) {

  // Server side controllers ---------------------------------------------- //
	var urlHandler = new UrlHandler();

	// HOME PAGE  ----------------------------------------------------------- //
	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/view/index.html');
		})

	// API call ------------------------------------------------------------- //
	app.route('/new/:urlFull*')
		.get(urlHandler.add);

	app.route('/:id')
		.get(urlHandler.redirect);

	// Error page ----------------------------------------------------------- //
	app.route('/error')
		.get(function(req, res) {
			res.send('This is an error page');
		});

  // Test page ------------------------------------------------------------ //
	app.route('/test')
		.get(function(req, res) {
			res.redirect(302,'http://www.lifehacker.com');
			//res.send("test")
		});

};


// EOF -------------------------------------------------------------------------
