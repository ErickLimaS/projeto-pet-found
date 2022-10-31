import mongoose from "mongoose";

const petSchema = new mongoose.Schema(

    {
        ownerId: { type: mongoose.ObjectId, required: true },
        ownerName: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        breed: { type: String, required: true },
        type: { type: String, required: true },
        typeTranslated: { type: String },
        createdAt: { type: Date, default: () => Date.now(), immutable: true },
        updatedAt: { type: Date, default: () => Date.now() },
        wasFound: { type: Boolean, default: false },
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
        moreInfo: { type: String, required: true }
    }

)

// date updates with users last saved action 
petSchema.pre("save", function (next) {

    try {
        this.updatedAt = Date.now()
        next()
    }
    catch (error) {
        return { message: error }
    }

})

const Pet = mongoose.model('Pet', petSchema)

export default Pet;