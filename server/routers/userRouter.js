import express from 'express'
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'

const userRouter = express.Router();

// bcrypt salt
const passwordSalt = 10;

// register user
userRouter.post('/register', expressAsyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email })

    // checks if user has already been added on DB 
    if (user) {

        return res.status(409).json({ message: 'User already created.' })

    }

    try {

        // hashes the plain password from body
        const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: {
                state: req.body.address.state,
                county: req.body.address.county,
                street: req.body.address.street,
            },
            contacts: {
                tel1: {
                    ddd: req.body.contacts.tel1.ddd,
                    tel: req.body.contacts.tel1.tel
                },
                tel2: {
                    ddd: req.body.contacts.tel2.ddd,
                    tel: req.body.contacts.tel2.tel
                },
                instagram: req.body.contacts.instagram,
                facebook: req.body.contacts.facebook
            },
        })

        await newUser.save()

        return res.status(201).json({
            name: newUser.name,
            token: generateToken(newUser)
        })

    }
    catch (err) {

        return res.status(500).json({
            status: 500,
            message: `Internal Error: ${err}`
        })

    }

}))

// login user
userRouter.post('/login', expressAsyncHandler(async (req, res) => {

    // verifies if email exist
    const userRegisted = await User.findOne({ email: req.body.email })

    if (!userRegisted) {

        return res.status(404).json(
            { message: 'Dados incorretos. Verique sua senha e email.' }
        )

    }

    try {

        // verifies if password match
        const correctPassword = await bcrypt.compare(req.body.password, userRegisted.password)

        if (!correctPassword) {

            return res.status(401).json(
                { message: 'Dados incorretos. Verique sua senha e email.' }
            )

        }

        return res.status(202).json({
            name: userRegisted.name,
            token: generateToken(userRegisted)
        })


    }
    catch (err) {

        return res.status(500).json({ message: err })

    }

}))

// all user data
userRouter.get('/info', isAuth, expressAsyncHandler(async (req, res) => {

    // verifies if email exist
    let user = await User.findById(req.user.userInfo._id, '-password -_id -updatedAt').populate('petsRegistered')

    let petsFound = user.petsRegistered.filter((pet) => pet.wasFound)

    if (petsFound) {

        petsFound = petsFound.forEach(async (pet) => {

            pet.userWhoFound.user = await User.findById(pet.userWhoFound._id)

            return { pet }

        })

        user.petsRegistered = [petsFound, user.petsRegistered.filter((pet) => pet.wasFound === false)]

    }

    if (!user) {

        return res.status(404).json(
            { message: 'User not found' }
        )

    }

    try {

        return res.status(200).json(user)

    }
    catch (err) {

        return res.status(500).json({ message: err })

    }

}))

// updates user profile data 
userRouter.put('/update-profile', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    // checks if password matchs with the one stored on server
    const passwordIsCorrect = await bcrypt.compare(req.body.password, user.password)

    if (!passwordIsCorrect) {

        return res.status(401).json({ message: 'Data Not Validated' })

    }

    // standardize the result for a successfull update request
    const successfullReponse = async () => {

        const user = await User.findById(req.user.userInfo._id)

        return {
            message: 'Success',
            name: user.name,
            token: generateToken(user)
        }

    }

    try {

        // gets which data the user wants to update
        const requestedUpdate = req.body.updateMethod

        if (requestedUpdate) {

            switch (requestedUpdate) {

                case 'CHANGE_PROFILE_IMAGE':

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { profileImg: req.body.profileImg },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_EMAIL':

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { email: req.body.email },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }
                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_PASSWORD':

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { password: await bcrypt.hash(req.body.password, passwordSalt) },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_NAME':

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { name: req.body.name },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_CONTACTS':

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { contacts: req.body.contacts },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                default:
                    return res.status(400).json({ message: 'Error with update request method' })

            }
        }
        else {
            return res.status(400).json({ message: 'No method received' })
        }

    }
    catch (err) {

        return res.status(500).json({ message: `${err}` })

    }

}))

export default userRouter;
