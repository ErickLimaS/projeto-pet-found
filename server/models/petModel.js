import mongoose, { Schema } from "mongoose";

const petSchema = new mongoose.Schema(

    {
        ownerId: { type: mongoose.ObjectId, required: true, immutable: true },
        ownerName: { type: String, required: true },
        name: { type: String, required: true },
        genre: { type: String, required: true },
        age: { type: Number, required: true },
        size: {type: String, required: true},
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
            firstName: { type: String },
            _id: { type: mongoose.ObjectId },
            rewardAccepted: { type: Boolean }
        },                              
        hasDisability: { type: Boolean, required: true },
        disability: { type: String, default: null},
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
        moreInfo: { type: String },
        postDetails: { type: String }
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