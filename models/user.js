const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
// const {Blog}  = require('./blogs');

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required : true, 
        min :3, 
        max : 50
    },
    email : {
        type : String, 
        required: true,
        unique: true,
        min: 5
    },
    password : {
        type: String, 
        required: true,
        min: 8
    }
    // blogs :[{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Blog'
    // }]
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id : this._id, email : this.email}, config.get('JWT_SECRET'), { expiresIn: '5m' })
    return token ;
}

const User = mongoose.model('User', userSchema);

// function validateUser(user){
//     const schema= {
//         username : Joi.string().min(3).max(50).required(),
//         email : Joi.string().min(5).required().email(),
//         password : Joi.string().min(8).required()
//     };
//     return Joi.validate(user, schema);
// }




function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(8).required()
    });

    // Use schema.validate instead of Joi.validate
    return schema.validate(user);
}


module.exports = {
    User: User,
    userSchema: userSchema,
    validateUser: validateUser
};


