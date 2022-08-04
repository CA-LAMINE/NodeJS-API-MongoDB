const mongoose =  require('mongoose')
const Schema = mongoose.Schema;

const data = new Schema({
    _id: Int,
    date: String,
    time: Int,
    temperature: String,
    humidity: String
  });

const Data = mongoose.model('Data', data)

module.exports = Data
