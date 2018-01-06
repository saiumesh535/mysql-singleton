'use strict'
const _mysql = require('mysql');
const _connection;
const _config;

module.exports = function (config) {

    if(!(config instanceof Object)) throw Error("config must be a Object")

    //config reference
    _config = config;

    _connection = _mysql.createConnection(config);
    handleDisconnect(config);
    _middlewareFn = function(req, res, next) {
        req.getConnection = function (callback) {
            callback(null, _connection);
            releaseConnection(res, _connection);
        }
        next();
    };
        return _middlewareFn;
    }
    
    function handleDisconnect() {
        _connection = _mysql.createConnection(_config);
    
        _connection.connect(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }
        });
    
        _connection.on('error', function (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }
    
    function releaseConnection(res, _connection) {
        res.on("close", closeHandler);
        res.on("finish", closeHandler);
        res.on('end', closeHandler);

        function closeHandler() {
            _connection.release();       
        }
    }