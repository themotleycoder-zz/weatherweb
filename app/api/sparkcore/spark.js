'use strict';

var controller = require('./services.controller.js');
var server = require('../../../app');
var socket = require('./../../services/socketservice');
var db = require('./../../services/dbservice');
var dbcontroller = require('./../../controllers/records.controller');

var spark = {

    devices: function (req, res) {
        controller.getDevices({}, function (result) {
            var err = {};
            var status;
            var statusCode = status || 200;
            var devices = [];
            if (result && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    devices.push({name: result[i].name, lastApp: result[i].lastApp, lastHeard: result[i].lastHeard});
                }
            }
            res.type('application/json').send(statusCode, {metadata: {}, result: devices});
        });
    },

    callFunction: function (req, res) {
        controller.callFunction({
            functionName: req.query.functionName,
            pin: req.query.pin,
            value: req.query.value
        }, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;
                res.type('application/json').send(statusCode, {metadata: {}, result: data});
            }
        });
    },

    runFunction: function (req, res) {
        controller.runFunction({
            functionName: req.query.functionName,
            pin: req.query.pin,
            value: req.query.value
        }, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;
                res.type('application/json').send(statusCode, {metadata: {}, result: data});
            }
        });
    },

    eventListen: function (req, res) {
        controller.eventListen({eventName: req.query.eventName}, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;

                try {
<<<<<<< HEAD
                    if (null!=data) {
                        var parsedData = JSON.parse(data.data);
                        socket.emit('weather_event', parsedData);
                        dbcontroller.createRecord(parsedData);
                    }
=======
                    var parsedData = JSON.parse(data.data);
                    socket.emit('weather_event', parsedData);
                    dbcontroller.createRecord(parsedData);
>>>>>>> 7a63865ac17149ffd02380c6042aaf37ec43c276
                } catch (e) {
                    console.log("Socket emit error: " + e);
                }
            }

        });
    }

};

function ServiceResponse(res, result, status) {
    var statusCode = status || 200;
    res.type('application/json').send(statusCode, {metadata: {}, result: devices});
}

exports.spark = spark;
