import mongoose from "mongoose";

const petSchema = new mongoose.Schema(

    {
        createdAt: { type: Date, default: Date.now() },
        ownerId: { type: mongoose.ObjectId, required: true },
        ownerName: { type: String, required: true },
        type: { type: String, required: true },
        typeTranslated: { type: String },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        breed: { type: String, required: true },
        // photoUrl: [
        //     { type: String, required: true } //fix it
        // ],
        lastSeen: {
            state: { type: String, required: true },
            county: { type: String, required: true },
            street: { type: String }
        },
        hasReward: { type: Boolean, required: true },
        rewardAmount: { type: Number },
        moreInfo: { type: String, required: true },
    }

)

const Pet = mongoose.model('Pet', petSchema)

export default Pet;