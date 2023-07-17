const express = require('express');
const { connection } = require('./config/db');
const { userRoutes } = require('./Routes/User.Route');
const { SubTasks } = require('./Routes/SubTask.Route');
const { BoardRoute } = require('./Routes/Board.Route');
const { TaskRoutes } = require('./Routes/Task.Route');

const app = express();
require('dotenv').config();


app.use(express.json());
app.use("/user", userRoutes)
app.use("/tasks", TaskRoutes)
app.use("/subtasks", SubTasks)
app.use("/board", BoardRoute)



app.listen(process.env.Port, async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`listening on ${process.env.Port}`)
   
})