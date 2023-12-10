const mongoose = require('mongoose');
const Joi = require('joi');

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
});

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


module.exports.User = User;
module.exports.validateUser = validateUser;
