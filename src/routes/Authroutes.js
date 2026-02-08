import express from "express";
import bcrypt from "bcryptjs";
import {User} from "../db.js"
import jwt from "jsonwebtoken"
const router=express.Router()


router.post("/register",async(req,res)=>{
    try{const {email,password}=req.body
    if(!email || !password){return res.status(400).json({message:"Please provide all the fields"})}
    const hashedpasskey=bcrypt.hashSync(password,10)
    const user=await User.create({
        login:email,
        password:hashedpasskey
    })
    
    const token = jwt.sign(
    { id:user._id },   // payload
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.json({ token, message:"User registered successfully" });}
    catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
})


router.post("/login",async(req,res)=>{
   try{ const {email,password}=req.body
    const user=await User.findOne({login:email})
    if(!user){return res.status(400).json({message:"User not found"})}
    
    const match= await bcrypt.compareSync(password, user.password)
    if(!password){return res.status(400).json({message:"invalid credentials"})}
    if(!match){return res.status(400).json({message:"invalid credentials"})}
    const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.json({ token, message:"User logged in successfully" });}
    catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }

})


export default router