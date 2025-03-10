const monngoose = require('mongoose');
const UserSchema = new monngoose.Schema({
    userName : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    }

})

const User = monngoose.model('User', UserSchema);
module.exports = User; 