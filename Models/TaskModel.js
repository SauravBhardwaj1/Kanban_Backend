const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title:{type: String},
    description:{type: String},
    subTasks: Array,
    status: Array,

},{
    versionKey: false
})

const TaskModel = mongoose.model('Task',TaskSchema)


module.exports = {TaskModel}
