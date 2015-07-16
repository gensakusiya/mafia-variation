var path = require('path');

module.exports = {
    root: path.normalize(__dirname + '/..'),
    staticRoot: path.normalize(__dirname + '/../..'),
    port: 80,

    admin: {
        name: 'itsme',
        password: '123456789'
    }
};