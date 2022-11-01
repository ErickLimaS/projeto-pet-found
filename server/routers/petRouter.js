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
    const state = req.query.state ? decodeURI(req.query.state) : null
    const county = req.query.county ? decodeURI(req.query.county) : null

    if (petType != null || state != null || county != null) {

        try {
            // with type, state and county
            if (petType != null && state != null && county != null) {

                Pet.find({

                    'type': petType,
                    'lastSeen.state': state,
                    'lastSeen.county': county

                }, function (err, docs) {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    else {

                        if (docs.length > 0) {

                            return res.status(200).json(docs)

                        }
                        else {

                            return res.status(404).json({ message: 'No results found' })

                        }

                    }
                })
            }

            // no type, just state and county
            else if (petType == null && state != null && county != null) {

                Pet.find({

                    'lastSeen.state': state,
                    'lastSeen.county': county

                }, function (err, docs) {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    else {

                        if (docs.length > 0) {

                            return res.status(200).json(docs)

                        }
                        else {

                            return res.status(404).json({ message: 'No results found' })

                        }

                    }
                })

            }

            // just type
            else if (petType != null && state == null && county == null) {

                Pet.find({

                    'type': petType

                }, function (err, docs) {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    else {

                        if (docs.length > 0) {

                            return res.status(200).json(docs)

                        }
                        else {

                            return res.status(404).json({ message: 'No results found' })

                        }

                    }
                })

            }
            else {
                return res.status(404).send('Query Method Error. Error on front.')
            }

        }
        catch (error) {
            return res.status(500).json({ message: error })
        }

    }
    else {

        try {
            Pet.find((err, docs) => {

                if (err) {
                    return res.status(500).json({ message: 'Erro Interno' })
                }
                return res.status(200).json(docs)

            })
        }
        catch (error) {
            return res.status(404).json({ message: error })
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

        return res.status(202).json({ message: "Success" })

    }
    catch (err) {

        return res.status(404).json({ message: "Pet não encontrado." })

    }

}))

export default petRouters;