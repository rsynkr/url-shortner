import express from "express";
import {Url} from "../db.js"
import {nanoid} from "nanoid"
const router=express.Router()
router.post("/",async(req,res)=>{
    try{
        const{url}=req.body
        if(!url){return res.status(400).json({message:"Please provide a URL"})}
        const code =nanoid(6)
        await Url.create({
            originalUrl:url,
            shortCode:code
        })
      
    }
        catch(err){
            console.log(err)
            res.status(500).json({message:"Server error"})
        }
})
export default router