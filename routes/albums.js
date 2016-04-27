var express = require('express');
var router = express.Router();
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;
var LoginHelper = new (require('../aux/loginHelper'));
var _ = require('underscore');
/*
router.get('/migrate', function (req, res) {
    "use strict";
    Album.find({}, (err, albums) => {
        albums.forEach((album) => {
            Photo.find({albums: album._id }, (err, photos) => {
                let order = 0;
                album.photos = photos.map((photo) => ({ photo: photo._id, order: order++ }));
                album.save();
            });
        })
    })
});
*/
router.get('/public/:id', function (req, res) {
    var queryParams = { _id: req.params.id, type: 'public' };

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

router.get('/public', function (req, res) {
    Album.find({ type: 'public' })
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
        query = Album.find({ owner: req.loggedUser._id, type: 'private' });
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
    var queryParams = { _id: req.params.id, type: 'private' };
    Album.findById(queryParams)
        .select({ photos: 1 })
        .populate('photos.photo')
        .exec(function (err, albums) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                const photos = albums.photos.map((i) => ({
                    photoId: i.photo._id,
                    order: i.order,
                    title: i.photo.title,
                    url: i.photo.url
                }));
                res.status(200).json(_.sortBy(photos, 'order'));
            }
        });
});

router.get('/:id/listPhotos', LoginHelper.validateToken, function (req, res) {
    Album.findById(req.params.id)
        .select({ photos: 1 })
        .populate('photos.photo')
        .exec(function (err, albums) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                const photos = albums.photos.map((i) => ({
                    photoId: i.photo._id,
                    order: i.order,
                    title: i.photo.title,
                    url: i.photo.url
                }));
                res.status(200).json(_.sortBy(photos, 'order'));
            }
        });
});

router.get('/public/:id/photos', function (req, res) {
    var queryParams = { _id: req.params.id, type: 'public' };
    Album.findById(queryParams)
        .select({ photos: 1 })
        .populate('photos.photo')
        .exec(function (err, albums) {
            if (err) {
                res.status(500).json({error: true, type: 'internal_error', details: err});
            } else {
                const photos = albums.photos.map((i) => ({
                    photoId: i.photo._id,
                    order: i.order,
                    title: i.photo.title,
                    url: i.photo.url
                }));
                res.status(200).json(_.sortBy(photos, 'order'));
            }
        });
});

router.put('/:id', LoginHelper.validateAdminToken, function (req, res) {
    req.body.updatedAt = new Date();

    if(req.body.type != 'private') {
        req.body.owner = null;
    }

    Album.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(500).json({error: true, type: 'internal_error', details: err});
        } else {
            Album.findById(req.params.id, function (err, data) {
                res.status(200).json(data);
            });
        }
    })
});

router.post('/', LoginHelper.validateAdminToken, function (req, res) {
    var newAlbum = new Album(req.body);
    newAlbum.createdAt = new Date();
    newAlbum.updatedAt = new Date();

    if(newAlbum.type != 'private') {
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
