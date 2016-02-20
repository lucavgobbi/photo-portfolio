var express = require('express');
var router = express.Router();

/* GET home page.
* This is the only route that provides an HTML file, all the others HTML are provided through Angular
* */
router.get('/', function(req, res){
    res.render('index');
});

router.post('/sendemail', function (req, res) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport(appConfig.email);

    var mailOptions = {
        from: appConfig.email.auth.user,
        to: appConfig.email.auth.user,
        subject: 'Website contact from: ' + req.body.name + ' (' + req.body.email + ')',
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        res.status(200).json({ success: (error == undefined) });
    });
});

router.get('/admin/:area/:name', function (req, res) {
    var area = req.params.area;
    var name = req.params.name;
    res.render('partials/admin/' + area + '/' + name);
});

router.get('/:area/:name', function (req, res) {
    var area = req.params.area;
    var name = req.params.name;
    res.render('partials/' + area + '/' + name);
});



module.exports = router;
