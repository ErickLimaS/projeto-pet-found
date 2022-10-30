import mongoose, { Schema } from "mongoose";
import Pet from "./petModel.js";

const userSchema = new mongoose.Schema(

    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() },
        address: {
            state: { type: String, required: true },
            county: { type: String, required: true },
            street: { type: String }
        },
        contacts: {
            tel1: {
                ddd: { type: String },
                tel: { type: String }
            },
            tel2: {
                ddd: { type: String },
                tel: { type: String }
            },
            instagram: { type: String },
            facebook: { type: String }
        },
        petsRegistered: [
            {
                type: Schema.Types.ObjectId,
                ref: Pet
            }
        ],
        notifications: []
    }

)

const User = mongoose.model('User', userSchema)

export default User;