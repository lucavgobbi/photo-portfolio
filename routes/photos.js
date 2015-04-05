/**
 * Created by lucavgobbi on 4/4/15.
 */
var express = require('express');
var router = express.Router();
var Photo = require('../models/photo').Photo;


router.get('/:id', function (req, res) {
    Photo.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else if (!data) {
            res.status(404).json({error: false, message: 'not_found'});
        }else {
            res.status(200).json(data);
        }
    })
});

router.get('/', function (req, res) {
    Photo.find(function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(200).json(data);
        }
    });
});

router.put('/:id', function (req, res) {
    Photo.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
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
    var newPhoto = new Photo(req.body);
    newPhoto.save(function (err, savedData) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            res.status(201).json(savedData);
        }
    });
});

router.post('/:id/addToAlbum/:albumId', function (req, res) {
    Photo.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            data.albums.addToSet(req.params.albumId);
            data.save(function (err, savedPhoto) {
                if (err) {
                    res.status(500).json({error: true, type: 'internal_error', details: err});
                } else {
                    res.status(200).json(savedPhoto);
                }
            })
        }
    })
});

router.delete('/:id/addToAlbum/:albumId', function (req, res) {
    Photo.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            data.albums.remove(req.params.albumId);
            data.save(function (err, savedPhoto) {
                if (err) {
                    res.status(500).json({error: true, type: 'internal_error', details: err});
                } else {
                    res.status(200).json(savedPhoto);
                }
            })
        }
    })
});


module.exports = router;