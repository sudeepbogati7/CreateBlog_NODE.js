const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
module.exports = function(){
    mongoose.connect(config.get("db"))
        .then(()=>winston.info('Successfully connected to mongoDB ....'))
        .catch(ex => winston.error('Failed to connect to DB ---', ex));
}




