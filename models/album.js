/**
 * Created by lucavgobbi on 3/22/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    description: String,
    shortDescription: String,
    title: { type: String, required: true },
    dateCreated: Date,
    cover: { type: Schema.Types.ObjectId, ref: 'Photo'}
});

var album = mongoose.model('Album', albumSchema);

module.exports = { Album: album };