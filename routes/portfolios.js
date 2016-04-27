/**
 * Created by lucavgobbi on 7/18/15.
 */
var express = require('express');
var router = express.Router();
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;

router.get('/', function (req, res) {
    var query = Album.find({ type: 'portfolio' });

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
    var queryParams = { _id: req.params.id, type: 'portfolio' };

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

module.exports = router;