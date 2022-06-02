const mongoose = require("mongoose")

const InputSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    input:{type:String,required:true},
    price:{type:Number,required:true}
},{timestamps:true})

module.exports=mongoose.model("Input",InputSchema)