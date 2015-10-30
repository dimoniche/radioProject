var http = require('http');
var querystring = require('querystring');

module.exports = function (app) {
	
	app.post('/sendRequest', function(req, res) {
		
		var data = JSON.stringify(req.body);

		var options = {
			host: 'localhost',
			port: 3000,
			method: 'POST',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
			}
		};
		
		var httpreq = http.request(options, function(res)
		{
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log("body: " + chunk);
			});
		});

		httpreq.write(data);
		httpreq.end();
	
	});
};