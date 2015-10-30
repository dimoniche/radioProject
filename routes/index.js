module.exports = function (app) {
    require("./home")(app);
    require("./auth")(app);
    require("./device")(app);
    require("./user")(app);
    require("./emul")(app);
};