require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT||5000
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const inputRouter = require("./routes/input")
const outputRouter = require("./routes/output")

mongoose.connect(process.env.MONGO_CONECT)
.then(()=>console.log("DB connection Successfull"))

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/input",inputRouter)
app.use("/api/output",outputRouter)

app.listen(port,()=>{
    console.log("API Server expense control running")
})