import Pet from "../models/petModel.js";
import User from '../models/userModel.js'
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js'

const petRouters = express.Router()

// all data related, filterd by query
petRouters.get('/all', expressAsyncHandler(async (req, res) => {

    // stores querys
    const petType = req.query.type || null
    const state = req.query.state || null
    const county = req.query.county || null

    if (petType != null || state != null || county != null) {

        try {
            // with type and state
            if (petType != null && state != null && county != null) {

                const sortForAllQuery = await Pet.find(
                    {
                        type: petType,
                        lastSeen: {
                            state: state,
                            county: county
                        }

                    }
                )

                if (sortForAllQuery.length > 0) {
                    return res.status(200).send(sortForAllQuery)
                }
                else {

                    return res.status(404).send('Not found')

                }
            }

            // no type, just state
            else if (petType == null && state != null && county != null) {

                const sortForStateAndCounty = await Pet.find({
                    lastSeen: {
                        state: state,
                        county: county
                    }
                })

                if (sortForStateAndCounty.length > 0) {
                    return res.status(200).send(sortForStateAndCounty)
                }
                else {

                    return res.status(404).send('Not found')

                }
            }

            // just type
            else if (petType != null && state == null && county == null) {

                const sortForPetType = await Pet.find({ type: petType })

                if (sortForPetType.length > 0) {
                    return res.status(200).send(sortForPetType)
                }
                else {

                    return res.status(404).send('Not found')

                }

            }
            else {
                return res.status(404).send('Query Error')
            }

        }
        catch (error) {
            return res.status(500).send(error)
        }

    }
    else {

        try {
            Pet.find((err, val) => {
                if (err) {
                    return res.status(500).send('Erro Interno')
                }
                return res.status(200).json(val)

            })
        }
        catch (error) {
            return res.status(404).send(error)
        }

    }


}))

// get info from a pet through a query ID
petRouters.get('/pet', expressAsyncHandler(async (req, res) => {

    try {
        const chosePet = await Pet.findById(req.query.id)

        if (chosePet) {

            return res.status(200).send(chosePet)

        }
        else {

            return res.status(404).send('Not Found')

        }
    }
    catch (error) {

        return res.status(500).json({ message: error })

    }

}))

// register a pet (user logged in)
petRouters.post('/register', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id);

    try {

        const pet = new Pet({
            ownerId: user._id,
            ownerName: user.name,
            type: req.body.type,
            typeTranslated: req.body.typeTranslated,
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            photoUrl: [
                req.body.name //fix it
            ],
            lastSeen: {
                state: req.body.lastSeen.state,
                county: req.body.lastSeen.county,
                street: req.body.lastSeen.street
            },
            hasReward: req.body.hasReward,
            rewardAmount: req.body.rewardAmount,
            moreInfo: req.body.moreInfo,
        })

        await pet.save();

        // populates User model with this Pet schema currently saved
        user.petsRegistered.push(pet)

        await user.save();

        return res.status(201).send(pet)

    }
    catch (error) {
        return res.status(500).json({ message: error })
    }

}))

// gets all pets registered by user
petRouters.get("/my-pets", isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    if (!user) {

        return res.status(404).json({ message: "Usuário não encontrado." })

    }

    try {
        const petsRegistered = await user.populate("petsRegistered")
            .then((result) => { return result })

        return res.status(200).json({ pets: petsRegistered.petsRegistered })

    }
    catch (err) {

        return res.status(500).json({ message: `Internal Error: ${err}` })

    }
}))

// when pet is found by someone and its confirmed by the owner, sets field wasFound = true
petRouters.put("/update-pet-status", isAuth, expressAsyncHandler(async (req, res) => {

    const pet = await Pet.findById(req.body.pet._id)

    if (!pet) {

        return res.status(404).json({ message: "Pet não encontrado." })

    }

    try {

        pet.wasFound = true;

        await pet.save()

        return res.status(200).send(pet)

    }
    catch (err) {

        return res.status(500).json({ message: `Internal Error: ${err}` })

    }

}))

// delete a pet post 
petRouters.delete("/remove-pet", isAuth, expressAsyncHandler(async (req, res) => {

    try {

        await Pet.findByIdAndDelete(req.body.pet._id)

        return res.status(202).json({message: "Success"})

    }
    catch (err) {

        return res.status(404).json({ message: "Pet não encontrado." })

    }

}))

export default petRouters;