const express = require('express')
const { SubTaskModel } = require('../Models/SubTaskModel')

const SubTasks = express.Router()

// GETTING ALL TASKS
SubTasks.get("/task",async(req,res)=>{
    try {
        const task = await SubTaskModel.find()
        res.status(200).json({msg: task})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Post New Task
SubTasks.post("/addSubtask",async(req,res)=>{

    try {
        const task = await SubTaskModel.create(req.body)
        await task.save()
        res.status(200).json({msg: "successfully added new task"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Update task
SubTasks.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await SubTaskModel.find({id:id})
        if(task){
            await SubTaskModel.findByIdAndUpdate({id:task.id, title:task.title})
            res.status(200).json({msg: "successfully updated task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Delete task
SubTasks.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await SubTaskModel.find({id:id})
        if(task){
            await SubTaskModel.findByIdAndDelete({id:task.id})
            res.status(200).json({msg: "successfully deleted task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = {SubTasks}