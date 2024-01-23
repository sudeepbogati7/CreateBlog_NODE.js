const express = require('express');
const app = express();
const winston = require('winston');
const path = require('path');
const port = 3000;
const config = require('config');

app.use(express.json());
app.engine('html', require('ejs').renderFile );
app.set('view engine', 'html');
app.set('views', path.join(__dirname , './views'));
app.use(express.static(path.join(__dirname, './public/css'))); // css file 
app.use(express.urlencoded({extended:true}));


//databse 
require('./config/database')();

//routes 
require('./src/routes/user')(app); //user-routes

//login-route
const loginRoute = require('./src/routes/login');
app.use('/', loginRoute);

//signup route 
const signupRoute = require('./src/routes/signup');
app.use('/',signupRoute);

//blogs-route
const blogsRoute = require('./src/routes/blog');
app.use('/', blogsRoute);


//authentication token varify(middleware)
const varifyToken = require('./src/middlewares/auth');
app.use('/',varifyToken);

//logout api
const logOut = require('./src/routes/logout');
app.use('/',logOut);


require('./prod')(app); // production middlewares


// if(!config.get("JWT_SECRET")){
//     throw new Error("FATAL ERROR : The environment variable is not defined ! ");
// }


require('./config/log_file')(); //logger.log
const server = app.listen(port, ()=>{
    winston.info(`listening to port ${port}.....`);
})

module.exports = server; 
