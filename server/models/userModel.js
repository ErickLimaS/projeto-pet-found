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
        petsFound: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Pet'
            }
        ],
        notifications: [
            {
                pet: {
                    _id: { type: mongoose.ObjectId, required: true },
                    name: { type: String, required: true },
                    genre: { type: String, required: true },
                    type: { type: String, required: true },
                    createdAt: { type: Date, default: () => Date.now(), immutable: true, required: true },
                },
                whoFound: {
                    _id: { type: mongoose.ObjectId, required: true },
                    name: { type: String, required: true }
                },
                createdAt: { type: Date, default: () => Date.now(), immutable: true, required: true },
                notificationRead: { type: Boolean, default: false },
                infoSentByWhoFound: {

                    // petImg: { required: true },
                    hasCollar: { type: Boolean, required: true },
                    collarName: { type: String || null },
                    foundAddress: { type: String }

                }
            }
        ]
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