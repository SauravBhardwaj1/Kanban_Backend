const express = require('express')
const { BoardModel } = require('../Models/BoardModel')

const BoardRoute = express.Router()

// GETTING ALL TASKS
BoardRoute.get("/task",async(req,res)=>{
    try {
        const task = await BoardModel.find()
        res.status(200).json({msg: task})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Post New Task
BoardRoute.post("/addtask",async(req,res)=>{

    try {
        const task = await BoardModel.create(req.body)
        await task.save()
        res.status(200).json({msg: "successfully added new task"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Update task
BoardRoute.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await BoardModel.find({id:id})
        if(task){
            await BoardModel.findByIdAndUpdate({id:task.id, name:task.name})
            res.status(200).json({msg: "successfully updated task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// Delete task
BoardRoute.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const task = await BoardModel.find({id:id})
        if(task){
            await BoardModel.findByIdAndDelete({id:task.id})
            res.status(200).json({msg: "successfully deleted task"})
        }else{
            res.status(400).json({msg: "task not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = {BoardRoute}