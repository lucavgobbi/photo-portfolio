/**
 * Created by lucavgobbi on 7/6/15.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var LoginHelper = new (require('../aux/loginHelper'));

router.get('/', LoginHelper.validateAdminToken, function (req, res) {
    User.find()
        .select({ login: 1, name: 1, isAdmin: 1 })
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                res.status(200).json(data);
            }
        });
});

router.post('/', LoginHelper.validateAdminToken, function (req, res) {
    //TODO: Deal with bad request
    var newUser = new User(req.body);
    newUser.password = require('crypto').createHash('sha1').update(newUser.password).digest('hex');

    newUser.save(function (err, savedData) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(201).json(savedData);
        }
    });
});

router.post('/login', function (req, res) {
    var crypto = require('crypto');
    //TODO: Deal with bad request
    var login = req.body.login;
    var password = crypto.createHash('sha1').update(req.body.password).digest('hex');

    User.findOne({ login: login, password: password}, function (err, user) {
        if (err){
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } if (user == null) {
            res.status(403).json({error: true, type: 'invalid_credentials', details: null});
        } else {
            crypto.randomBytes(48, function (ex, buf) {
                user.token = buf.toString('hex');
                user.tokenGeneratedAt = new Date();
                user.save(function (err, savedUser) {
                    if (err){
                        res.status(500).json({error: true, type: 'internal_error', details: err});
                    } else {
                        res.status(200).json({ login: user.login, token: user.token, name: user.name });
                    }
                });
            });
        }

    });
});

module.exports = router;
