var assert = require('assert');
var app = require('../app');
var http = require('http');
var should = require('should');

describe('Api testing', function () {
    "use strict";
    var server = http.createServer(app);

    before (function (done) {
        server.listen(3000, function (err) {
            done(err);
        });
    });

    after(function (done) {
        server.close();
        done();
    });

    it('Server is running!', function (done) {
        should.exist(server);
        done();
    });

    it('Deny requests without token', function (done) {
        http.get('http://localhost:3000/api/users', function (res) {
            res.statusCode.should.eql(400);
            res.on('data', function(d) {
                assert.equal((d),'{"error":true,"type":"token_required","details":"token was not provided"}', 'Not requiring user!')
                done();
            });
        });
    });
});