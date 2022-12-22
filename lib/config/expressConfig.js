'use strict';
//===============================Load Modules Start========================
const express = require("express"),
    bodyParser = require("body-parser"),//parses information from POST
    methodOverride = require('method-override');//used to manipulate POST
const morgan = require('morgan');

const pointRules = require('../../lib/modules/pointMatrix/pointRulesModel')
module.exports = function (app, env) {

    app.use(cors())
    app.options('*', cors())
    app.use(fileUpload());
    // parses application/json bodies
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(morgan("dev"));
    // app.use(morgan('combined'));
    // parses application/x-www-form-urlencoded bodies
    // use queryString lib to parse urlencoded bodies
    // app.use('/', express.static(process.cwd() + '../../../ful_frontend/build'));
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));
    // Function to serve all static files
    // inside public directory.
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/public/team_images', express.static(process.cwd() + '/public/team_images'));

    /**
     * add swagger to our project
     */
    app.use('/apiDocs', express.static(app.locals.rootDir + '/api/dist'));
    app.use(function (req, res, next) {
        //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', true);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
        // "lat lng,app_version,platform,ios_version,countryISO,Authorization");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
            "app_version,platform,ios_version,countryISO,Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
        next();
    });
};
