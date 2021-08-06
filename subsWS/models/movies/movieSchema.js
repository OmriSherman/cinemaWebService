var mongoose = require('mongoose');

var appSchema = mongoose.Schema;
var movieSchema = new appSchema({
    genres: [String],
    name: String,
    image: String,
    premiered: Date
})
module.exports = mongoose.model('movies',movieSchema);