module.exports = function (app) {
    app.get('/device', function (req, res) {
       	var db = req.db;
       	var collection = db.get('devices');
		collection.find({},{},function(e,docs){
			res.json(docs);
		});

    });
	
	app.get('/add-device', function (req, res) {

        var newDevice = {
            'device': "device",
            'description': "device_description",
            'answer': " "
        }

		var db = req.db;
		var collection = db.get('devices');

		collection.insert(newDevice, function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});
		
		res.redirect('/');
    });
	
	app.delete('/delete-device/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToDelete = req.params.id;
		
		collection.remove({ '_id' : deviceToDelete }, function(err) {
			res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
		});
	});
};