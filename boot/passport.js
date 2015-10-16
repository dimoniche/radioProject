var config = require("nconf");
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;
var AuthFacebookStrategy = require('passport-facebook').Strategy;
var AuthVKStrategy = require('passport-vkontakte').Strategy;

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {

        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "https://pp.vk.me/c7003/v7003079/374b/53lwetwOxD8.jpg",
                profileUrl: "http://vk.com/durov"
            });
        }

        return done(null, false, {
            message: 'Неверный логин или пароль'
        });
    }
));

passport.use('facebook', new AuthFacebookStrategy({
        clientID: config.get("auth:fb:app_id"),
        clientSecret: config.get("auth:fb:secret"),
        callbackURL: config.get("app:url") + "/auth/fb/callback",
        profileFields: [
            'id',
            'displayName',
            'profileUrl',
           // "username",
           // "link",
            "gender",
            "photos"
        ]
    },
    function (accessToken, refreshToken, profile, done) {

        //console.log("facebook auth: ", profile);

        return done(null, {
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl
        });
    }
));

passport.use('vk', new AuthVKStrategy({
        clientID: config.get("auth:vk:app_id"),
        clientSecret: config.get("auth:vk:secret"),
        callbackURL: config.get("app:url") + "/auth/vk/callback"
    },
    function (accessToken, refreshToken, profile, done) {

        //console.log("facebook auth: ", profile);

        return done(null, {
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl
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