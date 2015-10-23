module.exports = function (app) {
	
    app.get('/device', function (req, res) {
       	var db = req.db;
       	var collection = db.get('devices');

		//var answer = {username: req.user.username , JSON: ''};

		collection.find({},{},function(e,docs){
			res.json(docs);
		});
		
		//answer.JSON = res;
		//res = answer;
    });

	app.get('/add-device', function (req, res) {

        var newDevice = {
            'device': "device",
            'description': "device_description",
            'answer': "{1:1}"
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
	
	app.get('/show-device/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToShow = req.params.id;
		var tmp;

		collection.findById(deviceToShow, function(err, doc){
			tmp = doc;
		});

        res.render('showdevice', {
			device: deviceToShow,
			answer: collection.answer,
            error: req.flash('error')
        });
	});
};