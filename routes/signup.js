const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const winston = require('winston');



router.post('/signup', async(req,res) => {
    try{
        const {error} = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);
           
        let user = await User.findOne({email : req.body.email});
        if(user) return res.status(400).send("Email already exists ! ");
    
        user = new User(_.pick(req.body, ['username', 'email', 'password']));
    
        //hashing password using bcrypt 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        // res.send(_.pick(user, ['username', 'email']));
        res.redirect(`/home?username=${user.username}&email=${user.email}`);
    }catch(error){
        winston.error("Internal Server Error : ", error);
    }

});

module.exports = router;