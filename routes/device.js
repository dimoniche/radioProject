module.exports = function (app) {
    app.get('/device', function (req, res) {
       	var db = req.db;
       	var collection = db.get('devices');
		collection.find({},{},function(e,docs){
			res.json(docs);
		});

    });
};