const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, "First name must be more than 2 characters"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [2, "Last name must be more than 2 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: `{VALUE} is not a valid email`
            }
        },
    },
    {timestamps: true}
);

// Create collection and add schema
const User = mongoose.model('User', UserSchema);
module.exports = { User };

