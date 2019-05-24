const mongoose = require('../');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    created_at: {
        type: Date
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
