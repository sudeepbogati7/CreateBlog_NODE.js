const winston = require('winston');
const winstonMongoDB = require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    process.on('uncaughtException', ()=>{
        winston.error("Uncaught Exception : ", ex);
    });
    
    process.on('unhandledRejection', (reason)=>{
        winston.error("Unhandled Rejection : ", reason);
    });

    winston.add(new winston.transports.Console({colorize: true, format:winston.format.simple()}));
    winston.add(new winston.transports.File({filename: 'logger.log'}));
    winston.add(new winstonMongoDB.MongoDB({
        level: 'error',
        db: 'mongodb://localhost:27017/quotes',
        options: { useUnifiedTopology: true },
        collection: 'logs'
    }));
}



