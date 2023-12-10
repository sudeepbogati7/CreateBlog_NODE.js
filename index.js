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
const loginRoute = require('./routes/login');
app.use('/', loginRoute);





require('./sources/log_file')(); //logger.log
app.listen(port, ()=>{
    winston.info(`listening to port ${port}.....`);
})