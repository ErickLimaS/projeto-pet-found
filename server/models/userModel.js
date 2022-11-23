import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema(

    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String },
        createdAt: { type: Date, default: () => Date.now(), immutable: true },
        updatedAt: { type: Date, default: () => Date.now() },
        address: {
            state: { type: String, required: true },
            state_abbrev: { type: String, required: true },
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
                ref: 'Pet'
            }
        ],
        petsUserFound: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Pet'
            }
        ],
        notifications: []
    }

)

// date updates before updating data
userSchema.pre("findOneAndUpdate", async function (next) {

    try {
        this.update({ updatedAt: Date.now() })
        next()
    }
    catch (error) {
        return { message: error }
    }
})

const User = mongoose.model('User', userSchema)

export default User;