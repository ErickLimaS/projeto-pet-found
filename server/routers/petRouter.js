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
    const state = req.query.state_abbrev ? decodeURI(req.query.state_abbrev) : null
    const county = req.query.county ? decodeURI(req.query.county) : null
    const timeSort = req.query.time_sort || null;
    const hasDisability = req.query.hasDisability || null;

    if (petType != null || state != null || county != null || timeSort != null) {

        try {

            // with sort_time, type, state, county and hasDisability
            if (petType != null && state != null && county != null && timeSort != null && hasDisability != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'type': petType,
                    'lastSeen.state_abbrev': state,
                    'lastSeen.county': county,
                    'hasDisability': hasDisability,
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

            // with sort_time, type, state, county
            else if (petType != null && state != null && county != null && timeSort != null && hasDisability == null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'type': petType,
                    'lastSeen.state_abbrev': state,
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

            // with type, state, county and hasDisability
            else if (petType != null && state != null && county != null && hasDisability != null) {

                Pet.find({

                    'type': petType,
                    'lastSeen.state_abbrev': state,
                    'hasDisability': hasDisability,
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

            // with type, state, county
            else if (petType != null && state != null && county != null && hasDisability == null) {

                Pet.find({

                    'type': petType,
                    'lastSeen.state_abbrev': state,
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

            // just time_sort, state, county and hasDisability
            else if (timeSort != null && petType == null && state != null && county != null && hasDisability != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'lastSeen.state_abbrev': state,
                    'lastSeen.county': county,
                    'hasDisability': hasDisability,
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

            // just time_sort, state and county
            else if (timeSort != null && petType == null && state != null && county != null && hasDisability == null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'lastSeen.state_abbrev': state,
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

            // just state, county and hasDisability
            else if (petType == null && state != null && county != null && hasDisability != null) {

                Pet.find({

                    'lastSeen.state_abbrev': state,
                    'hasDisability': hasDisability,
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

            // just state, county 
            else if (petType == null && state != null && county != null && hasDisability == null) {

                Pet.find({

                    'lastSeen.state_abbrev': state,
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

            // only type, hasDisability and sort_time
            else if (petType != null && timeSort != null && state == null && county == null && hasDisability != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                Pet.find({

                    'type': petType,
                    'hasDisability': hasDisability,
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

            // only type and sort_time
            else if (petType != null && timeSort != null && state == null && county == null && hasDisability == null) {

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

            // only hasDisability and type
            else if (petType != null && state == null && county == null && timeSort == null && hasDisability != null) {

                Pet.find({
                    'hasDisability': hasDisability,
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

            // only type
            else if (petType != null && state == null && county == null && timeSort == null && hasDisability == null) {

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

            // only hasDisability and sort_time
            else if (timeSort != null && petType == null && state == null && county == null && hasDisability != null) {

                let reqSortData = new Date()
                reqSortData.setHours(reqSortData.getHours() - timeSort)
                reqSortData.toISOString

                const data = await Pet.find({
                    'hasDisability': hasDisability,
                    'createdAt': { $lte: new Date().toISOString(), $gte: reqSortData }
                })

                return res.status(200).json(data)

            }

            // only sort_time
            else if (timeSort != null && petType == null && state == null && county == null && hasDisability == null) {

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
                    return res.status(500).json({ message: `${err}` })
                }
                return res.status(200).json(docs)

            })
        }
        catch (error) {
            return res.status(404).json({ message: `${error}` })
        }

    }


}))

// get info from a pet through a query ID
petRouters.get('/pet', expressAsyncHandler(async (req, res) => {

    try {
        const chosePet = await Pet.findById(req.query.id)
        const petOwner = await User.findById(chosePet.ownerId)


        if (chosePet) {

            return res.status(200).json({chosePet, contacts: petOwner.contacts})

        }
        else {

            return res.status(404).send('Not Found')

        }
    }
    catch (error) {

        return res.status(500).json({ message: `${error}` })

    }

}))

// register a pet
petRouters.post('/register', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id);

    try {

        // if pet was lost on same location as owner lives, rewrite lastSeen location
        if (req.body.lastSeen.whereOwnerLives) {

            req.body.lastSeen.state = user.address.state
            req.body.lastSeen.state_abbrev = user.address.state_abbrev
            req.body.lastSeen.county = user.address.county
            req.body.lastSeen.street = user.address.street

        }

        // sets owner name and id
        req.body.ownerId = user._id
        req.body.ownerName = user.firstName

        const pet = new Pet(req.body)

        await pet.save();

        // populates User model with this Pet schema currently saved
        user.petsRegistered.push(pet)
        user.activityLog.push(
            {
                title: `Criou anúncio de um${pet.genre == 'male' ? 'o' : 'a'} ${pet.typeTranslated} perdid${pet.genre == 'male' ? 'o' : 'a'}.`,
                type: 'PET_POST_CREATED'
            }
        )

        await user.save();

        return res.status(201).json({ success: true, message: `Post do Pet Criado com Sucesso!`, pet: { id: pet._id } })


    }
    catch (error) {
        return res.status(500).json({ success: false, message: `${error}` })
    }

}))

// set pet as found
petRouters.put('/set-as-found', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id);

    // checks if user is the owner of the pet
    if (user) {

        const petIsFromUser = user.petsRegistered.find((pet) => pet == req.body.pet._id)

        if (!petIsFromUser) {

            return res.status(401).json({ success: false, message: 'Usuário não é o dono ou esse pet não existe.' });

        }

    }
    else {

        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });

    }

    try {

        Pet.findOneAndUpdate({ _id: req.body.pet._id },
            {
                wasFound: true,
                dateWhenFound: () => Date.now(),
                userWhoFound: {
                    firstName: req.body.userWhoFound.firstName,
                    _id: req.body.userWhoFound._id,
                    rewardAccepted: req.body.rewardAccepted,
                }
            },
            function (err, result) {

                if (err) {
                    return res.status(404).json({ success: false, message: `${err}` });
                }
                else {

                    return res.status(200).json({ success: true, message: 'Concluído' });

                }

            }
        )

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `${error}` })

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

        return res.status(500).json({ message: `${err}` })

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

        return res.status(500).json({ message: `${err}` })

    }

}))

// delete a pet post 
petRouters.delete("/remove-pet", isAuth, expressAsyncHandler(async (req, res) => {

    try {

        await Pet.findByIdAndDelete(req.body.pet._id)

        return res.status(202).json({ message: "Success" })

    }
    catch (err) {

        return res.status(404).json({ message: `${error}` })

    }

}))

petRouters.put("/notify-owner", isAuth, expressAsyncHandler(async (req, res) => {

    // gets the user info from who sent this request 
    const userWhoFound = await User.findById(req.user.userInfo._id)

    // gets pet info
    const pet = await Pet.findById(req.body.pet._id)

    // gets the pet owner info
    const petOwner = await User.findById(pet.ownerId)

    try {

        // verify if pet owner account is the same of who found
        if (userWhoFound.email === petOwner.email) {

            return res.status(403).json(
                { success: false, message: 'Você não pode fazer isso sendo o dono desse pet. Tente ir nas configurações da sua conta para editar esse post.' }
            )

        }

        // sets a notification to the owner of the lost pet
        petOwner.notifications.push(
            {
                pet: pet,
                whoFound: {
                    _id: req.user.userInfo._id,
                    firstName: req.user.userInfo.firstName
                },
                infoSentByWhoFound: {
                    // petImg,
                    hasCollar: req.body.moreInfo.hasCollar,
                    collarName: req.body.moreInfo.collarName || null,
                    foundAddress: req.body.moreInfo.foundAddress
                }
            }
        )

        // sets on activityLog 
        petOwner.activityLog.push(
            {
                title: `Notificou um Usuário sobre ${pet.genre === 'male' ? 'seu' : 'sua'} ${pet.typeTranslated.slice(0, pet.typeTranslated.length - 1)}${pet.genre === 'male' ? 'o' : 'a'} perdid${pet.genre === 'male' ? 'o' : 'a'}.`,
                type: 'NOTIFY-OWNER'
            }
        )

        // sets info of lost pet to the user who found account 
        userWhoFound.petsFound.push(pet)

        await petOwner.save()
        await userWhoFound.save()

        return res.status(202).json(
            {
                success: true,
                message: 'Dono do pet notificado. Agora ele deve retornar o contato.'
            }
        )

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `${error}` })

    }

}))

export default petRouters;