import express from "express"
import path , {dirname} from "path"
import {fileURLToPath} from "url"
import Authroutes from "./routes/Authroutes.js"
import shortenroutes from "./routes/shortenroutes.js"
import connectDB from "./db.js"
import { Url } from "./db.js";
import cors from"cors"
const app=express()
const PORT=process.env.PORT || 5000





connectDB()
app.use(cors())
app.use(express.json())
app.use("/auth",Authroutes)
app.use("/shorten",shortenroutes)

app.get("/:code", async (req,res)=>{
  const entry = await Url.findOne({ shortCode:req.params.code });

  if(!entry){
    return res.send("Not found");
  }

  entry.clicks++;
  await entry.save();

  res.redirect(entry.originalUrl);
});









//routes

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})