module.exports = function (app,UserDetails) {
    require("./express")(app);
    require("./passport")(app,UserDetails);
};