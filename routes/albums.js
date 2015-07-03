var express = require('express');
var router = express.Router();
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;


router.get('/:id', function (req, res) {
    Album.findById(req.params.id)
        .populate('cover')
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                res.status(200).json(data);
            }
        });
});

router.get('/', function (req, res) {
    Album.find()
        .sort({ title: 'asc' })
        .populate('cover')
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                res.status(200).json(data);
            }
        });
});

router.get('/:id/photos', function (req, res) {
    Photo.find({albums: req.params.id }, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(200).json(data);
        }
    });
});

router.put('/:id', function (req, res) {
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

router.post('/', function (req, res) {
    var newAlbum = new Album(req.body);
    newAlbum.save(function (err, savedData) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(201).json(savedData);
        }
    });
});

module.exports = router;
