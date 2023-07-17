const express = require('express');
const { UserModel } = require('../Models/UserModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRoutes = express.Router();

userRoutes.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email: email})
        if(user){
            res.status(400).json({msg: "User already exists"})
        }
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            const user1 = await UserModel({email, password:hash})
            await user1.save()
            res.status(200).json({msg: 'Successfully registered user'})
        });
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})


userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email: email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                    var token = jwt.sign({ userid: user._id }, 'masai');
                    res.status(200).json({msg: "Login successful", token: token});
                }else{
                    res.status(401).json({msg: "wrong credentials",})                
                }
            });
        }else{
            res.status(401).json({msg: "user not found"})
        }
        
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = {userRoutes}