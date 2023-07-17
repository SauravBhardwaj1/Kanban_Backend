const mongoose = require('mongoose');


const SubTaskSchema = mongoose.Schema({
    title:{type: String},
    isCompleted:{type: Boolean},
    
},{
    versionKey: false
})

const SubTaskModel = mongoose.model('SubTask',SubTaskSchema)


module.exports = {SubTaskModel}
