/**
 * Created by lucavgobbi on 4/4/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    description: String,
    shortDescription: String,
    title: { type: String, required: true },
    url: { type: String, required: true },
    dateTaken: Date,
    dateCreated: Date,
    albums: [{type: String, ref: 'Album'}]
});

var photo = mongoose.model('Photo', photoSchema);

module.exports = { Photo: photo };
