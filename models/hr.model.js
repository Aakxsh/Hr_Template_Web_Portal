const mongoose = require ('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hrSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required : true,
            minlength:[3, 'First name must be atleast 3 charachter long']
        },
        lastname:{
            type:String,
            required: true,
            minlength:[3, 'LAst name must be atleast 3 characters long']
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function (v){
                return /^[a-zA-Z0-9._%+-]+@gmail\.com|yahoo\.com|outlook\.com)$/i.test(v);
            },
            message: prope => `${props.value} is not a valid email domain!`,
        },
    },

    password:{
        type: String,
        requied: true,
        minlength: [8, 'Password must be atleast 8 charachter'],
        select:false,
    },

    role:{
        type: String,
        default: 'HR'
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
})



//Generate Auth token
hrSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

//compare Password
hrSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}



//Hash Password
hrSchema.staticshashPassword = async function (password){
    return bcrypt.hash(password, 10)
};



const hrModel = mongoose.model('hr', hrSchema)
module.exports = hrModel;