/**
 * Created by lucavgobbi on 7/18/15.
 */
var express = require('express');
var router = express.Router();
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;

router.get('/', function (req, res) {
    var query = Album.find({ isPortfolio: true });

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

router.get('/:id', function (req, res) {
    var queryParams = { _id: req.params.id, isPortfolio: true };

    Album.findOne(queryParams)
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
    //TODO: add owner verification
    Photo.find({albums: req.params.id }, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;