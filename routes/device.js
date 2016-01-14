module.exports = function (app) {
	
	// выводим набор больших устройств
    app.get('/device', function (req, res) {
       	var db = req.db;
       	var collection = db.get('devices');

		collection.find({},{sort: {lastAccessTime : -1}},function(e,docs){
			res.json(docs);
		});
    });

	// выводим набор маленьких устройств
    app.get('/smalldevice/:id', function (req, res) {
      	var db = req.db;
       	var collection = db.get('devices');
		var id = req.params.id;

		collection.findOne({ '_id': id }).on('success', function (doc) {
            
            if(doc != undefined)
            {
                if(doc.answer != undefined)
                {
                    var answer = doc.answer;
                    res.json(doc.answer);
                }
            }
		});
    });

	//  добавляем большой устройство к которому подключаются маленькие
	app.get('/add-device', function (req, res) {

		// здесь добавление одного большого и одного маленького устройства

		var answer = new Array();
		answer[answer.length] = {'id': answer.length,'name': "БМС1", 'state': 'on', 'ch1':'ok', 'ch2':'ok', 'ch3':'ok'};	// маленькое устройство

		// большое устройство
        var newDevice = {
			'deviceId': answer.length,
            'description': "Ретранслятор",
			'lastAccessTime': new Date(),
            'ch1':'ok',
            'ch2':'ok',
            'ch3':'ok',
            'subnet':'ok',
            'answer': answer
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
	
	//	добавляем маленькое устройство к большому
	app.get('/add-small-device/:id', function (req, res) {

        var answer = [];
		var id = req.params.id;
		var db = req.db;
		var collection = db.get('devices');

		// сначала найдем то что есть
		collection.findOne({ '_id': id }).on('success', function (doc) {
		
			// узнаем что было
			answer = doc.answer;
	
            answer[answer.length] = {'id': answer.length,'name': "БМС" + (answer.length + 1), 'state': 'on', 'ch1':'ok', 'ch2':'ok', 'ch3':'ok'};    // добавим маленькое устройство

			collection.findAndModify(
			{
				"query": { "_id": id },
				"update": { "$set": { 
					"answer": answer,
					'lastAccessTime': new Date(),
				}},
				"options": { "new": true, "upsert": true }
			},
			function(err,doc) {
				if (err) throw err;
				
				res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
				
				console.log( doc );
			});
			
		});
    });

	app.delete('/delete-device/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToDelete = req.params.id;
		
		collection.remove({ '_id' : deviceToDelete }, function(err) {
			res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
		});
	});
	
	app.delete('/delete-smalldevice/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToDelete = req.params.id;
		
		var arr = deviceToDelete.split(">");
		var answer;
		
		collection.findOne({ '_id': arr[0] }).on('success', function (doc) {
			
			answer = doc.answer;
			
			var val = parseInt(arr[1]);
			
			answer.splice(val,1);
			
			answer.forEach(function(item, i, arr) {
  				item.id = i;
			});

			collection.findAndModify(
			{
				"query": { "_id": arr[0] },
				"update": { "$set": { 
					"answer": answer,
					'lastAccessTime': new Date(),
				}},
				"options": { "new": true, "upsert": true }
			},
			function(err,doc) {
				if (err) throw err;
				
				res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
				
				console.log( doc );
			});
		});
	});
	
	app.get('/updatestate/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToDelete = req.params.id;
		
		var arr = deviceToDelete.split(">");
		var answer;
		
		collection.findOne({ '_id': arr[0] }).on('success', function (doc) {
			
			answer = doc.answer;
			
			var val = parseInt(arr[1]);
			
			if(answer[val].state == 'on')
				answer[val].state = 'off';
			else
				answer[val].state = 'on';

			collection.findAndModify(
			{
				"query": { "_id": arr[0] },
				"update": { "$set": { 
					"answer": answer,
					'lastAccessTime': new Date(),
				}},
				"options": { "new": true, "upsert": true }
			},
			function(err,doc) {
				if (err) throw err;
				
				res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
				
				console.log( doc );
			});
		});
	});
				
	app.get('/show-device/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToShow = req.params.id;
		var currentuser = req.user;

		collection.findOne({ '_id': deviceToShow }).on('success', function (doc) {

			res.render('showdevice', {
				user: currentuser,
				device: doc,
				error: req.flash('error')
			});
		});
	});
	
	app.get('/gosaveDesc/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToShow = req.params.id;
		var currentuser = req.user;

		collection.findOne({ '_id': deviceToShow }).on('success', function (doc) {
			
			res.render('savedesc', {
				user: currentuser,
				device: doc,
				error: req.flash('error')
			});
		});
	});
	
	app.post('/renameDesc/:id', function(req, res) {
		
		var db = req.db;
		var collection = db.get('devices');
		var deviceToShow = req.params.id;
        var name = req.body.name;

		collection.findAndModify(
		{
			"query": { "_id": deviceToShow },
			"update": { "$set": { 
				"description": name,
				'lastAccessTime': new Date(),
			}},
			"options": { "new": true, "upsert": true }
		},
		function(err,doc) {
			if (err) throw err;
			
			console.log( doc );
			
			res.redirect('/');
		});
	});
};