const _ = require("lodash");
const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig");
const path = require("path");
var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'dev';
console.log(environment);

//ENV Config

var defaultConfig = {
    ip: 'localhost',
    port: process.env.PORT,
    protocol: 'http',
    TAG: "development",
    //uploadDir: path.resolve("./uploads"),
    mongo: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbUrl,
        options: { useNewUrlParser: true }
    },
    swagger_port: 80
};
//Create Final Config JSON by extending env from default
cfg = _.extend(defaultConfig, envConfig);


//Export config module
module.exports = {
    cfg,
    dbConfig,
    expressConfig
};
