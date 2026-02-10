import mongoose from "mongoose"


const connectDB=async()=>{
    try{await mongoose.connect("mongodb://127.0.0.1:27017/qrcode")
    console.log("MongoDB connected")
    }
    catch(err){
        console.log(err)
    }
}

const userSchema=new mongoose.Schema({
    login:{type:String,
        unique:true,
        required:true},
    password:{type:String,
        required:true}
})

const urlSchema=new mongoose.Schema({
    originalUrl:{type:String,required:true},
    shortCode:{type:String,unique:true},
    clicks:{type:Number,default:0},
})




export const User = mongoose.model("User", userSchema);
export const Url = mongoose.model("Url", urlSchema);
export default connectDB