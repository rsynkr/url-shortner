import express from "express"
import path , {dirname} from "path"
import {fileURLToPath} from "url"
import Authroutes from "./routes/Authroutes.js"
import shortenroutes from "./routes/shortenroutes.js"
import connectDB from "./db.js"
const app=express()
const PORT=process.env.PORT || 5000


const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

app.use(express.static(path.join(__dirname,"../public")))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})
connectDB()
app.use(express.json())
//routes
app.use("/auth",Authroutes)
app.use("/shorten",shortenroutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})