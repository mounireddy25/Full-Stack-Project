import mongoose, { mongo } from "mongoose";

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error in connecting DB", error.message);
    }
};

export default connectToMongoDB;