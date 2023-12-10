const _ = require('lodash');
const bcrypt = require('bcrypt');

//user-model
const {User, validateUser} = require('../models/user');
const winston = require('winston/lib/winston/config');

module.exports = function(app){
    
    app.get('/login', (req, res)=>{
        res.render('login');
    });
    
    app.get('/' ,(req, res) => {
        res.redirect('/login');
    });

    app.get('/signup',(req, res)=>{
        res.render('signup');
    }); 
    
    app.post('/signup', async(req,res) => {
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


    app.get('/home', (req, res)=>{
        try{
            const username = req.query.username;
            const email = req.query.email;
            res.render('home',{username , email});
        }catch(err){
            console.error(err);
            res.status(500).json({err : 'Internal Server Error'});
        }
    });
}

