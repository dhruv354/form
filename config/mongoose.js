const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,  useUnifiedTopology: true });
console.log('mongoose loaded');

module.exports = mongoose
