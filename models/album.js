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
    createdAt: Date,
    updatedAt: Date,
    cover: { type: Schema.Types.ObjectId, ref: 'Photo'},
    coverDetails: {
        x: Number,
        y: Number,
        height: Number,
        width: Number
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    type: { type: String, enum: ['public', 'private', 'portfolio']}
});

var album = mongoose.model('Album', albumSchema);

module.exports = { Album: album };