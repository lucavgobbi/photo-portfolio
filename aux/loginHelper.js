/**
 * Created by lucavgobbi on 7/6/15.
 */
module.exports = LoginHelper;

var User = require('../models/user').User;

function LoginHelper() {

}

LoginHelper.prototype.validateToken = function (req, res, next) {
    var token = req.query.token;
    User.findOne({ token: token }, function (err, user) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } if (user == null) {
            res.status(403).json({error: true, type: 'invalid_credentials', details: null});
        } else {
            req.loggedUser = user;
            next();
        }
    });
};

LoginHelper.prototype.validateAdminToken = function (req, res, next) {
    var token = req.query.token;
    User.findOne({ token: token, isAdmin: true }, function (err, user) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } if (user == null) {
            res.status(403).json({error: true, type: 'invalid_credentials', details: null});
        } else {
            req.loggedUser = user;
            next();
        }
    });
};


