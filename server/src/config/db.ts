import mongoose from 'mongoose'
const connectDB = async ()=>{
    try {
        await mongoose.connect(String(process.env.MONGO_URI));
        console.log('✅ MongoDB connected');
    } catch (error:any) {
        console.log('❌ MongoDB connection Failed');
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB