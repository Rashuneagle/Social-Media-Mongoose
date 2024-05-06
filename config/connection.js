const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/developersApplications')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
module.exports = connection;
