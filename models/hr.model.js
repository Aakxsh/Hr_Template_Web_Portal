const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HrSchema = new mongoose.Schema({
    fullname: {
        firstname: { 
            type: String, 
            required: true,
            minlength:[3, 'First name must be atleast 3 charachter long']
        },
        lastname: { 
            type: String,
            required: true,
            minlength:[3, 'Last name must be atleast 3 characters long']
        },
    },

    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function (v) {
                return /(gmail\.com|yahoo\.com|outlook\.com)$/i.test(v);
            },
            message: props => `${props.value} is not a valid email domain! Use Gmail, Yahoo, or Outlook.`,
        },
    },

    password: { 
        type: String, 
        required: true,
        minlength: [8, 'Password must be atleast 8 charachter']
    },

    role:{
        type: String,
        default: 'HR'
    },

    created_at: { 
        type: Date, 
        default: Date.now },
});

// Hash password before saving
HrSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare Password
HrSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
HrSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

const Hr = mongoose.model('Hr', HrSchema);
module.exports = Hr;
