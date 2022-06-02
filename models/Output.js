const mongoose = require("mongoose")

const OutputSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    output:{type:String,required:true},
    price:{type:Number,required:true}
},{timestamps:true})

module.exports=mongoose.model("Output",OutputSchema)