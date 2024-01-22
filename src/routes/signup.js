const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const winston = require('winston');
const _  = require('lodash');


router.post('/signup', async(req,res) => {
    try{
        const {error} = validateUser(req.body);
        if(error) return res.status(400).json({error: error.details[0].message, message: "Invalid input ! "});
           
        let user = await User.findOne({email : req.body.email});
        if(user) return res.status(400).json({error: "EmailAlreadyExists", message: "Error ! Email already exists !"});
    
        user = new User(_.pick(req.body, ['username', 'email', 'password']));
    
        //hashing password using bcrypt 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        // res.send(_.pick(user, ['username', 'email']));
        // res.redirect(`/home?username=${user.username}&email=${user.email}`);
        
        
        return res.status(200).json({
            username : user.username,
            email: user.email,
            password : user.password,
            message : "User registered successfully!"
        });

    }catch(err){
        winston.error("Internal Server Error : ", err.message);
        return res.status(500).json({error : "Internal Server Error "});
    }
});

module.exports = router;