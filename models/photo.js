/**
 * Created by lucavgobbi on 4/4/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    name: String,
    description: String,
    shortDescription: String,
    title: String,
    url: String,
    dateTaken: Date,
    dateCreated: Date,
    albums: [{type: String, ref: 'album'}]
});

var photo = mongoose.model('photo', photoSchema);

module.exports = { Photo: photo };
