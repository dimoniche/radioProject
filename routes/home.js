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
        
        var ans = [{'id': '1','name': "БМС1", 'state': 'on', 'ch1':'ok', 'ch2':'ok', 'ch3':'ok'},{'id': '2','name': "БМС2", 'state': 'on', 'ch1':'ok', 'ch2':'ok', 'ch3':'ok'}];
        
        res.render('emulator', {
            answer: JSON.stringify(ans),
            user: req.user
        });
    });
};