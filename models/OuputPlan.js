const mongoose = require("mongoose")

const OutputPlanShema = new mongoose.Schema({
    id:{type:String,require:true},
    output:{type:String,require:true},
    amount:{type:Number,require:true}
},{timestamps:true})

module.exports=mongoose.model("outputPlan",OutputPlanShema)