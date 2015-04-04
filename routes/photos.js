/**
 * Created by lucavgobbi on 4/4/15.
 */
var express = require('express');
var router = express.Router();
var Photo = require('../models/photo').Photo;


router.get('/:id', function (req, res) {
    Photo.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
});

router.get('/', function (req, res) {
    Photo.find(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    });
});

//TODO: Return
router.put('/:id', function (req, res) {
    Photo.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({});
        }
    })
});

router.post('/', function (req, res) {
    var newPhoto = new Photo(req.body);
    newPhoto.save(function (err, savedData) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(savedData);
        }
    });
});

router.post('/:id/addToAlbum/:albumId', function (req, res) {
    Photo.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.albums.addToSet(req.params.albumId);
            data.save(function (err, savedPhoto) {
                if (err) {
                    res.status(500).json(err);
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
            res.status(500).json(err);
        } else {
            data.albums.remove(req.params.albumId);
            data.save(function (err, savedPhoto) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(savedPhoto);
                }
            })
        }
    })
});


module.exports = router;
