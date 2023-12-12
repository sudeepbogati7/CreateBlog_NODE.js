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
    
    app.get('/', (req, res) =>{
        res.render('blogs');
    });


    // app.get('/' ,(req, res) => {
    //     res.redirect('/blogs');
    // });


    
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

