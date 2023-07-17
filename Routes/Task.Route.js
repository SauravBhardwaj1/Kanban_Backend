const express = require('express')

const TaskRoutes = express.Router()

// GETTING ALL TASKS
TaskRoutes.get("/task",async(req,res)=>{
    try {
        const task = await TaskModel.find()
        res.status(200).json({msg: task})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Post New Task
TaskRoutes.post("/addtask",async(req,res)=>{

    try {
        const task = await TaskModel.create(req.body)
        await task.save()
        res.status(200).json({msg: "successfully added new task"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Update task
TaskRoutes.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await TaskModel.find({id:id})
        if(task){
            await TaskModel.findByIdAndUpdate({id:task.id, title:task.title})
            res.status(200).json({msg: "successfully updated task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Delete task
TaskRoutes.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await TaskModel.find({id:id})
        if(task){
            await TaskModel.findByIdAndDelete({id:task.id})
            res.status(200).json({msg: "successfully deleted task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = {TaskRoutes}