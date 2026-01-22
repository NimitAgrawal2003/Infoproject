import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async ()=>{
    try{
        const MONGODB_URI = process.env.MONGODB_URI
        if(!MONGODB_URI){
            console.log('Environment variable MONGODB_URI is not set. Check your .env file.')
            process.exit(1)
        }
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
}

export default connectDB