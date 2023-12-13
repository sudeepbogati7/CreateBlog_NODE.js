const express = require('express');
const app = express();
const winston = require('winston');
const path = require('path');
const port = 3000;


app.use(express.json());
app.engine('html', require('ejs').renderFile );
app.set('view engine', 'html');
app.set('views', path.join(__dirname , './views'));
app.use(express.static(path.join(__dirname, './public/css'))); // css file 
app.use(express.urlencoded({extended:true}));


//databse 
require('./sources/database')();

//routes 
require('./routes/user')(app); //user-routes

//login-route
const loginRoute = require('./routes/login');
app.use('/', loginRoute);

//signup route 
const signupRoute = require('./routes/signup');
app.use('/',signupRoute);

//blogs-route
const blogsRoute = require('./routes/blog');
app.use('/', blogsRoute);


//authentication token varify(middleware)
const varifyToken = require('./middlewares/auth');
app.use('/',varifyToken);

require('./prod')(); // production middlewares



require('./sources/log_file')(); //logger.log
app.listen(port, ()=>{
    winston.info(`listening to port ${port}.....`);
})