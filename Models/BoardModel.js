const mongoose = require('mongoose');


const BoardSchema = mongoose.Schema({
    name:{type: String},
    tasks: Array

},{
    versionKey: false
})

const BoardModel = mongoose.model('Board',BoardSchema)


module.exports = {BoardModel}
