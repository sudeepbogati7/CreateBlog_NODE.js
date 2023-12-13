const helmet = require('helmet');
const compression = require('compression');
const { func } = require('joi');

module.exports = function(app) {
    app.use(helmet());
    app.use(compression());
}
