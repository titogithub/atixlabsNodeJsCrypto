var path = require('path'),
 bodyParser = require('body-parser'),
 cookieParser = require('cookie-parser'),
 morgan = require('morgan'),
 methodOverride = require('method-override'),
 routes = require('../router/fileRouter');

module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	routes(app);
	app.use((err, req, res, next) => {
		console.error(err.stack)
		next(err)
	});
	app.use((err, req, res, next) => {
		res.status(500).send({ error: 'Something failed!' })
	})
	return app;
};