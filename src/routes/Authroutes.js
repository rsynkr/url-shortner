import express from "express";
import {User} from "../db.js"
const router=express.Router()


router.post("/register",(req,res)=>{
    const {username,password}=req.body
    res.status(200).json({message:"User registered succesfully"})
    if(!username || !password){return res.status(400).json({message:"Please provide all the fields"})}
   
})


router.post("/login",async(req,res)=>{
    const {username,password}=req.body
    await User.create({
        login:username,
        password:password
    })
    res.status(200).json(username,password)})


export default router