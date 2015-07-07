/**
 * Created by lucavgobbi on 7/6/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    login: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date,
    isAdmin: Boolean,
    token: String,
    tokenGeneratedAt: Date
});

var user = mongoose.model('User', userSchema);

module.exports = { User: user };
