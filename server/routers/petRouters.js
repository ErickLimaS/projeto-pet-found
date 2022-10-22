import Pet from "../models/petModel.js";
import express from "express";
import expressAsyncHandler from 'express-async-handler';

const petRouters = express.Router()

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
                            state: "TEST",
                            county: "TEST"
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

petRouters.post('/register', expressAsyncHandler(async (req, res) => {

    try {

        const pet = new Pet({
            ownerId: req.body.ownerId,
            type: req.body.type,
            typeTranslated: req.body.typeTranslated,
            name: req.body.name,
            age: 11,
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

        return res.status(201).send(pet)

    }
    catch (error) {
        return res.status(500).send(error)
    }

}))


export default petRouters;