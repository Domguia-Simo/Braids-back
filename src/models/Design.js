const mongoose = require('mongoose')
const Schema = mongoose.Schema

const designSchema = new Schema({
   title:{type:String},
   desc:{type:String},
   duration:{type:String},
   price:{type:Number},
   images:[{type:String}]

});

const Design = mongoose.model('design', designSchema);
module.exports = Design