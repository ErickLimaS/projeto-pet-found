import express from 'express'
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import Pet from '../models/petModel.js'
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

        return res.status(409).json({ message: 'Email já cadastrado. Tente fazer login.' })

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
            message: `Server Error: ${err}`
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
    let user = await User.findById(req.user.userInfo._id, '-password -_id -updatedAt').populate('petsFound').populate('petsRegistered')

    if (!user) {

        return res.status(404).json(
            { message: 'User not found' }
        )

    }

    try {

        return res.status(200).json(user)

    }
    catch (err) {

        return res.status(500).json({ message: `${err}` })

    }

}))

// updates user profile data 
userRouter.put('/update-profile', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    // checks if password matchs with the one stored on server
    const checkPassword = async () => {
        const passwordIsCorrect = await bcrypt.compare(req.body.currentPassword, user.password)

        if (!passwordIsCorrect) {

            return res.status(401).json({ message: 'Incorrect User Info Received' })

        }
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

                    await checkPassword()

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

                    await checkPassword()

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

                    await checkPassword()

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        { password: await bcrypt.hash(req.body.newPassword, passwordSalt) },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_NAME':

                    await checkPassword()

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

                case 'CHANGE_NAME_AND_ADDRESS':

                    await checkPassword()

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        {
                            name: req.body.name,
                            address: {
                                street: req.body.street,
                                county: req.body.county,
                                state: req.body.state
                            }
                        },
                        async function (err, result) {

                            if (err) {
                                return res.status(404).json({ message: `${err}` })
                            }

                        }
                    )

                    return res.status(202).json(await successfullReponse())

                case 'CHANGE_ADDRESS':

                    await checkPassword()

                    User.findOneAndUpdate(
                        { _id: req.user.userInfo._id },
                        {
                            address: {
                                street: req.body.street,
                                county: req.body.county,
                                state: req.body.state
                            }
                        },
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
                    return res.status(400).json({ message: 'Server Error. Provided method do not match.' })

            }
        }
        else {
            return res.status(400).json({ message: 'Server Error. No method received' })
        }

    }
    catch (err) {

        return res.status(500).json({ message: `${err}` })

    }

}))

// sends notifications from user account
userRouter.get('/notifications', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id, '--password')

    const params = req.query.q || null

    try {

        let notifications = []

        switch (params) {

            // returns notifications not read
            case ('not_read'):

                // filter the notifications which was not read yet
                user.notifications.forEach(async (item) => {
                    if (item.notificationRead === false) {

                        notifications.push(item)

                    }

                })

                return res.status(200).json({ success: true, notifications: notifications })

            default: // all

                return res.status(200).json({ success: true, notifications: user.notifications })

        }

    }

    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error. ${error}` })
    }
}))

// set notifications not read to read
userRouter.put('/set-notifications-read', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    try {

        user.notifications.forEach((item) => {

            if (item.notificationRead === false) {

                item.notificationRead = true

            }

        })

        await user.save()

        return res.status(200).json({ success: true, message: 'Todas as notificações lidas' })

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `${error}` })

    }

}))

// send contact info from USER who found the current user pet
userRouter.get('/another-user-contacts', isAuth, expressAsyncHandler(async (req, res) => {

    const userWhoFound = await User.findById(req.query.id, '--password')

    try {

        return res.status(200).json({ success: true, contacts: userWhoFound.contacts })

    }

    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error. ${error}` })
    }

}))

userRouter.delete('/delete-notification', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    try {
        user.notifications.deleteOne({
            _id: req.body.notification.id

        })

        // await user.save()

        return res.status(200).json({ success: true, message: 'Notificação Apagada.' })


    }
    catch (error) {

        return res.status(500).json({ success: false, message: `Server Error. ${error}` })

    }

}))

export default userRouter;
