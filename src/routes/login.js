const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {User} = require('../models/user');
const winston = require('winston/lib/winston/config');

const router = express.Router();

router.post('/login',async(req, res) => {
    
    const { email , password } = req.body;
    
    try{
        const user = await User.findOne({ email }).select('-username');
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error : "Invalid email Or password! ", message: "Invalid Email or password ! "});
        }
    
        //generate JWT token 
        const token = user.generateAuthToken();

        // res.json({token});
       return res.status(200).json({
            Auth_token : token,
            success : true, 
            user : { email : user.email},
            message : "Sucessfully LoggedIn"
       });
    }catch(err){
        console.log("Internal server error : ", err);
        winston.error("internal Server Error ", err);
        res.status(500).send("Internal server error ");
    }
});



module.exports = router;
