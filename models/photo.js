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
    createdAt: Date,
    updatedAt: Date,
    albums: [{type: String, ref: 'Album'}],
    thumbDetails: {
        x: Number,
        y: Number,
        height: Number,
        width: Number
    }
});

var photo = mongoose.model('Photo', photoSchema);

module.exports = { Photo: photo };
