const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required : true,
            minlength:[3, 'First name must be atleast 3 charachters long']
        },
        lastname:{
            type : String,
            required: true,
            minlength:[3, 'Last name must be atlease 3 charachter long']
        }
    },

    email:{
        type:String,
        required: true,
        unique: true,
        validate:{
            validator: function (v){
                return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i.test(v);
            },
            message: props => `${props.value} is not valid email domain`,
        }
    },

    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be atleast 8 charachters long'],
        select: false,
    },

    role:{
        type: String,
        enum: ['Admin', 'HR'],
        default: 'Admin'
    },
    createdAt:{
       type: Date,
       defalut: Date.now 
     }
})


//Hash the password before saving
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT Token
AdminSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};



// compare the password
AdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;

