import Pet from "../models/petModel.js";
import User from '../models/userModel.js'
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../utils.js'
import bcrypt from 'bcrypt'

const petRouters = express.Router()

// bcrypt salt
const passwordSalt = 10;

// all data related, filterd by query
petRouters.get('/all', expressAsyncHandler(async (req, res) => {

    // stores querys
    const petType = req.query.type || null
    const state = req.query.state ? decodeURI(req.query.state) : null
    const county = req.query.county ? decodeURI(req.query.county) : null
    const timeSort = req.query.time_sort || null;

    if (petType != null || state != null || county != null || timeSort != null) {

        try {

            // with sort_time, type, state, county
            if (petType != null && state != null && county != null && timeSort != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'type': petType,
                    'lastSeen.state': state,
                    'lastSeen.county': county,
                    'createdAt': { $lte: new Date().toISOString(), $gte: reqSortData }

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

            // with type, state, county
            else if (petType != null && state != null && county != null) {

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

            // just time_sort, state and county
            else if (timeSort != null && petType == null && state != null && county != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'lastSeen.state': state,
                    'lastSeen.county': county,
                    'createdAt': { $lte: new Date().toISOString(), $gte: reqSortData }

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

            // just state and county
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

            // only type and sort_time
            else if (petType != null && timeSort != null && state == null && county == null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'type': petType,
                    'createdAt': { $lte: new Date().toISOString(), $gte: reqSortData }

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

            // only type
            else if (petType != null && state == null && county == null && timeSort == null) {

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

            // only sort_time
            else if (timeSort != null && petType == null && state == null && county == null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                const data = await Pet.find(
                    { 'createdAt': { $lte: new Date().toISOString(), $gte: reqSortData } }
                )

                return res.status(200).json(data)

            }

            else {
                return res.status(404).send('Query Method Error. Error on frontend.')
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

    let user;

    // if user has a account, it will be stored here
    if (req.body.createUser === false) {

        user = await User.findById(req.user.userInfo._id);

    }

    try {

        // if user don't exist, it will create a new account
        if (req.body.createUser === true) {

            // hashes the plain password from body
            const hashedPassword = await bcrypt.hash(req.body.user.password, passwordSalt)

            user = new User({
                name: req.body.user.name,
                email: req.body.user.email,
                password: hashedPassword,
                address: {
                    state: req.body.user.address.state,
                    county: req.body.user.address.county,
                    street: req.body.user.address.street || null,
                },
                contacts: {
                    tel1: {
                        ddd: req.body.user.contacts.tel1.ddd || null,
                        tel: req.body.user.contacts.tel1.tel || null
                    },
                    tel2: {
                        ddd: req.body.user.contacts.tel2.ddd || null,
                        tel: req.body.user.contacts.tel2.tel || null
                    },
                    instagram: req.body.user.contacts.instagram || null,
                    facebook: req.body.user.contacts.facebook || null
                },
            })

            await user.save()

        }

        const pet = new Pet({
            ownerId: user._id,
            ownerName: user.name,
            type: req.body.info.type,
            typeTranslated: req.body.info.typeTranslated,
            name: req.body.info.name,
            // age: req.body.info.age,
            breed: req.body.info.breed,
            particulars: req.body.info.particulars,
            // photoUrl: [
            //     req.body.info.name //fix it
            // ],
            lastSeen: {
                state: req.body.info.lastSeen.whereOwnerLives ?
                    user.address.state : req.body.info.lastSeen.state,
                county: req.body.info.lastSeen.whereOwnerLives ?
                    user.address.county : req.body.info.lastSeen.county,
                street: req.body.info.lastSeen.whereOwnerLives ?
                    (user.address.street || null) : req.body.info.lastSeen.street
            },
            hasReward: req.body.info.hasReward,
            rewardAmount: req.body.info.rewardAmount,
            moreInfo: req.body.info.moreInfo,
            postDetails: req.body.info.postDetails
        })

        await pet.save();

        // populates User model with this Pet schema currently saved
        user.petsRegistered.push(pet)

        await user.save();

        if (req.body.createUser === true) {
            return res.status(201).json({
                name: user.name,
                token: generateToken(user),
                pet
            })
        }
        else {
            return res.status(201).send(pet)
        }

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

        return res.status(500).json({ message: `Internal Error: ${err} ` })

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

        return res.status(500).json({ message: `Internal Error: ${err} ` })

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