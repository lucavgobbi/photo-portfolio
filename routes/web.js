var express = require('express');
var router = express.Router();

/* GET home page.
* This is the only route that provides an HTML file, all the others HTML are provided through Angular
* */
router.get('/', function(req, res){
    res.render('index');
});

router.get('/:area/:name', function (req, res) {
    var area = req.params.area;
    var name = req.params.name;
    res.render('partials/' + area + '/' + name);
});

module.exports = router;
