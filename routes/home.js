module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });
    
    app.get('/add-device', function (req, res) {

        count_dev++;
    });
};