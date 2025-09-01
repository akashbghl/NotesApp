import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    dob: NativeDate;
    email: string;
    isverified: boolean;
    verificationCode?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default UserModel;
//# sourceMappingURL=User.d.ts.map