var express = require('express');
var router = express.Router();

/* GET albums listing. */
router.get('/', function(req, res, next) {
  res.status(200).json([
            {
                id: 1,
                name: "album1",
                title: 'Album 1',
                description: 'this is the album 1 description',
                covers: [
                    { url: 'https://40.media.tumblr.com/e3c8cc1d17109bc6e16fdae28a480e05/tumblr_njmm1jMX6I1tgdr12o1_1280.jpg', title: 'Cover image 1'},
                    { url: 'http://40.media.tumblr.com/8d734f0487a8f9c78b0229e93f0878d3/tumblr_nir04kAovH1tgdr12o1_500.jpg', title: 'Cover image 2'}]
            },
            {
                id: 2,
                name: "album2",
                title: 'Album 2',
                description: 'this is the album 2 description',
                covers: [
                    { url: 'http://40.media.tumblr.com/8d734f0487a8f9c78b0229e93f0878d3/tumblr_nir04kAovH1tgdr12o1_500.jpg', title: 'Cover image 1'},
                    { url: 'http://40.media.tumblr.com/a94cfefe1bc57297d6ee3f3baac1d83f/tumblr_nig3i3riMp1tgdr12o1_500.jpg', title: 'Cover image 2'}]
            },
            {
              id: 3,
              name: "album3",
              title: 'Album 3',
              description: 'this is the album 2 description',
              covers: [
                  { url: 'http://40.media.tumblr.com/a94cfefe1bc57297d6ee3f3baac1d83f/tumblr_nig3i3riMp1tgdr12o1_500.jpg', title: 'Cover image 1'},
                  { url: 'http://40.media.tumblr.com/1015c0a12317551f3b2900bc147b77a0/tumblr_ndhrqkP5As1tgdr12o1_500.jpg', title: 'Cover image 2'}]
            },
            {
              id: 4,
              name: "album4",
              title: 'Album 4',
              description: 'this is the album 2 description',
              covers: [
                  { url: 'http://40.media.tumblr.com/1015c0a12317551f3b2900bc147b77a0/tumblr_ndhrqkP5As1tgdr12o1_500.jpg', title: 'Cover image 1'},
                  { url: 'http://40.media.tumblr.com/1015c0a12317551f3b2900bc147b77a0/tumblr_ndhrqkP5As1tgdr12o1_500.jpg', title: 'Cover image 2'}]
            },
            {
              id: 5,
              name: "album5",
              title: 'Album 5',
              description: 'this is the album 2 description',
              covers: [
                  { url: 'http://40.media.tumblr.com/232d55ff9e6f591e19d6e66fdf5973bc/tumblr_ndhrlvT9Yf1tgdr12o1_500.jpg', title: 'Cover image 1'},
                  { url: 'https://40.media.tumblr.com/e3c8cc1d17109bc6e16fdae28a480e05/tumblr_njmm1jMX6I1tgdr12o1_1280.jpg', title: 'Cover image 2'}]
            }
      ]);
});

module.exports = router;
