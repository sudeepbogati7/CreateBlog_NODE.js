const _ = require('lodash');
const bcrypt = require('bcrypt');

//user-model
const {User, validateUser} = require('../models/user');
const winston = require('winston/lib/winston/config');

module.exports = function(app){
    
    app.get('/login', (req, res)=>{
        res.render('login');
    });
    
    app.get('/signup',(req, res)=>{
        res.render('signup');
    }); 
    


    app.get('/' ,(req, res) => {
        res.redirect('/home');
    });


    
    app.get('/home', (req, res)=>{
        res.render('home');
    });

    app.get('/blogs', (req, res)=>{
        res.render('blogs');
    });
}

