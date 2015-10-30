module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });
    app.get('/show_user', function (req, res) {
        res.render('user', {
            user: req.user
        });
    });
    app.get('/show_emul', function (req, res) {
        res.render('emulator', {
            user: req.user
        });
    });
};