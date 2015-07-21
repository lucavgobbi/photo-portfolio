var express = require('express');
var router = express.Router();
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;
var LoginHelper = new (require('../aux/loginHelper'));


router.get('/:id', LoginHelper.validateToken, function (req, res) {
    var queryParams = { _id: req.params.id };

    if (!req.loggedUser.isAdmin) {
        queryParams.owner = req.loggedUser._id;
    }

    Album.findOne(queryParams)
        .populate('cover')
        .populate('owner', { login: 1, name: 1 })
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                res.status(200).json(data);
            }
        });
});

router.get('/', LoginHelper.validateToken, function (req, res) {
    var query;

    if (req.loggedUser.isAdmin) {
        query = Album.find();
    } else {
        query = Album.find({ owner: req.loggedUser._id });
    }

    query.sort({ title: 'asc' })
        .populate('cover')
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                res.status(200).json(data);
            }
        });
});

router.get('/:id/photos', LoginHelper.validateToken, function (req, res) {
    //TODO: add owner verification
    Photo.find({albums: req.params.id }, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(200).json(data);
        }
    });
});

router.put('/:id', LoginHelper.validateAdminToken, function (req, res) {
    req.body.updatedAt = new Date();

    if(req.body.isPortfolio) {
        req.body.owner = null;
    }

    Album.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            Photo.findById(req.params.id, function (err, data) {
                res.status(200).json(data);
            });
        }
    })
});

router.post('/', LoginHelper.validateAdminToken, function (req, res) {
    var newAlbum = new Album(req.body);
    newAlbum.createdAt = new Date();
    newAlbum.updatedAt = new Date();

    if(newAlbum.isPortfolio) {
        delete newAlbum.owner;
    }

    newAlbum.save(function (err, savedData) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(201).json(savedData);
        }
    });
});

module.exports = router;
