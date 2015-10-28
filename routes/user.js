module.exports = function (app) {
	
	app.post('/adduser', function(req, res) {
		var db = req.db;
		var collection = db.get('user');
		collection.insert(req.body, function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});
	});

	app.get('/user', function (req, res) {
       	var db = req.db;
       	var collection = db.get('user');

		collection.find({},{},function(e,docs){
			res.json(docs);
		});
    });
	
	app.delete('/deleteuser/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('user');
		var user = req.params.id;
		
		collection.remove({ '_id' : user }, function(err) {
			res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
		});
	});
};