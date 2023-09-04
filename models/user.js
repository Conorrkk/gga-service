const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    club: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    var user = this;
// only hash pw if modified or new
if (!user.isModified('password')) return next();

bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});
});

// compares the entered password to the stored, encrypted password and returns the result
userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(er);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema)