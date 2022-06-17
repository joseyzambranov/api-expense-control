const mongoose = require("mongoose")

const InputPlanShema = new mongoose.Schema({
    userId:{type:String,required:true},
    
    data:{
        id:{type:String,required:true},
    input:{type:String,required:true},
    amount:{type:Number,required:true},
    delete:{type:Boolean,required:true}

    }
    
},{timestamps:true})

module.exports=mongoose.model("inputPlan",InputPlanShema)