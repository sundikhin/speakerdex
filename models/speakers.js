const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
  name: String,
  description: String,
  region: String,
  image: String,
  role: String,
  topics: Array // will  have a title and theme (strings)
});

const Speaker = mongoose.model('Speaker', speakerSchema);

module.exports = Speaker;