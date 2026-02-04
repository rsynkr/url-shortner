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






export const User = mongoose.model("User", userSchema);
export default connectDB