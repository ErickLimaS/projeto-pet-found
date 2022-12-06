import mongoose, { Schema } from "mongoose";

const petSchema = new mongoose.Schema(

    {
        ownerId: { type: mongoose.ObjectId, required: true, immutable: true },
        ownerName: { type: String, required: true },
        name: { type: String, required: true },
        genre: { type: String, required: true },
        // age: { type: Number, required: true },
        breed: { type: String, required: true },
        type: { type: String, required: true },
        typeTranslated: { type: String },
        particulars: [
            { type: String }
        ],
        createdAt: { type: Date, default: () => Date.now(), immutable: true },
        updatedAt: { type: Date, default: () => Date.now() },
        wasFound: { type: Boolean, default: false },
        dateWhenFound: { type: Date },
        userWhoFound: {
            name: { type: String },
            _id: { type: mongoose.ObjectId },
            rewardAccepted: { type: Boolean }
        },
        hasDisability: { type: Boolean, required: true },
        // photoUrl: [
        //     { type: String, required: true } //fix it
        // ],
        lastSeen: {
            state: { type: String, required: true },
            state_abbrev: { type: String, required: true },
            county: { type: String, required: true },
            street: { type: String }
        },
        hasReward: { type: Boolean, required: true },
        rewardAmount: { type: Number },
        moreInfo: { type: String, required: true },
        postDetails: { type: String } // owner providing details on the post
    }

)

// date updates before updating data
petSchema.pre('findOneAndUpdate', async function (next) {

    try {
        this.update({ updatedAt: Date.now() })
        next()
    }
    catch (error) {
        return { message: `${error}` }
    }

})

const Pet = mongoose.model('Pet', petSchema)

export default Pet;