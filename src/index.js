// console.log("🚀 App starting...");
// import { EventEmitter } from 'events';
// EventEmitter.defaultMaxListeners = 20;

import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from './app.js';

dotenv.config({
    path:'./.env'
})

  
connectDB()
.then( () =>{
    app.listen(process.env.PORT , () =>{
        console.log(`server running at port ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log("DB connection failed ", error)
})














/*
(async()=>{

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    } catch (error) {
        console.error("error",error)
        throw error
    }

})
    */