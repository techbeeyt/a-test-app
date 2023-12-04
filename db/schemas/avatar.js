// In a new file like schemas/avatar.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvatarSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    selectedAvatar: String
});

module.exports = mongoose.model('Avatar', AvatarSchema);