var mongoose = require("mongoose");

var appSchema = mongoose.Schema;
var subSchema = new appSchema({
  memberId: String,
  movies: [
    {
      _id: false,
      movieId: String,
      date: String
    }
  ]
})
module.exports = mongoose.model('subscriptions', subSchema);
