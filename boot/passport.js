var config = require("nconf");
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
                
        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "https://pp.vk.me/c7003/v7003079/374b/53lwetwOxD8.jpg",
            });
        }

        if (username == "test" && password == "test") {
            return done(null, {
                username: "test",
                photoUrl: "http://cs621418.vk.me/v621418607/18bc6/8IW6NZaXKe8.jpg",
            });
        }

        return done(null, false, {
            message: 'Неверный логин или пароль'
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};