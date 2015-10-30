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
        
        var ans = {'id': '1','name': "Устройство", 'state': 'on','lastTimeAccess': '30.10.2015'};
        
        res.render('emulator', {
            answer: JSON.stringify(ans),
            user: req.user
        });
    });
};