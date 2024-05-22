const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const book = new Schema({
    name:{type:String},
    date:{type:Date},
    status:{type:Boolean},
    phone:{type:String},
    designId:{type:String},

})

const BookModel = mongoose.model('book' ,book)
module.exports = BookModel