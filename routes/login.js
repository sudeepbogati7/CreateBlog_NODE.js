const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {User, validateUser} = require('../models/user');
const winston = require('winston/lib/winston/config');

const router = express.Router();

router.post('/login',async(req, res) => {
    
    const { email , password } = req.body;
    
    try{
        const {err} = validateUser(req.body);
        if(err) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email });
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error : "Invalid Email or password !"});
        }
    
        //generate JWT token 
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn : '1h'});

        // res.json({token});
        res.redirect(`/home?username=${user.username}&email=${user.email}&key=${token}`);
    }catch(err){
        console.log("Internal server error : ", err);
        winston.error("internal Server Error ", err);
        res.status(500).send("Internal server error ");
    }
});



module.exports = router;
