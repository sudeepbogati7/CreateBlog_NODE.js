const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/quotes')
        .then(()=>winston.info('Successfully connected to mongoDB ....'))
        .catch(ex => winston.error('Failed to connect to DB ---', ex));
}




