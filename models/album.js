/**
 * Created by lucavgobbi on 3/22/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    description: String,
    shortDescription: String,
    title: String,
    dateCreated: Date
});

var album = mongoose.model('album', albumSchema);

module.exports = { Album: album };