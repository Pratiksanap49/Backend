console.log("🚀 App starting...");
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})

  
connectDB();














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