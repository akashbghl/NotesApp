import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name:{type:String , required: true},
        dob:{type:Date, required: true},
        email:{type:String , required: true , unique: true},
        isverified:{type:Boolean, default:false},
        verificationCode:String,
        verificationCodeExpiry: Date,
        isWelcomeSent:{type:Boolean , default:false}
    },
    {timestamps:true}
)
const UserModel = mongoose.model('user',userSchema);
export default UserModel