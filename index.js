require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT||5000
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const inputRouter = require("./routes/input")
const outputRouter = require("./routes/output")
const inputPlanRouter = require("./routes/inputPlan")
const forgotpasswordRouter = require("./routes/forgotPasswordControler")

mongoose.connect(process.env.MONGO_CONECT)
.then(()=>console.log("DB connection Successfull"))

app.use(express.json())
app.use(cors())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/input",inputRouter)
app.use("/api/output",outputRouter)
app.use("/api/inputPlan",inputPlanRouter)
app.use("/api/forgotpassword",forgotpasswordRouter)

app.listen(port,()=>{
    console.log("API Server expense control running")
})