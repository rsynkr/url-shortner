import express from "express";
import {Url} from "../db.js"
import {nanoid} from "nanoid"
const router=express.Router()
router.post("/",async(req,res)=>{
    try{
        const{url}=req.body
        if(!url){return res.status(400).json({message:"Please provide a URL"})}
        console.log("BODY:", req.body);

        const code =nanoid(6)
        await Url.create({
            originalUrl:url,
            shortCode:code
        })
        return res.json({code})
      
    }
        catch(err){
            console.log(err)
            return res.json({code:null})
        }
})
export default router