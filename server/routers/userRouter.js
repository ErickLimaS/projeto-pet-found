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

        return res.status(409).json({ message: 'Email já cadastrado. Tente fazer login.' })

    }

    try {

        // hashes the plain password from body
        const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt)

        req.body.password = hashedPassword

        const newUser = new User(req.body)

        await newUser.save()

        return res.status(201).json({
            success: true,
            name: newUser.firstName,
            token: generateToken(newUser)
        })

    }
    catch (err) {

        return res.status(500).json({
            success: false,
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
            { success: false, message: 'Dados incorretos. Verique sua senha e email.' }
        )

    }

    try {

        // verifies if password match
        const correctPassword = await bcrypt.compare(req.body.password, userRegisted.password)

        if (!correctPassword) {

            return res.status(401).json(
                { success: false, message: 'Dados incorretos. Verique sua senha e email.' }
            )

        }

        return res.status(202).json({
            success: true,
            name: userRegisted.firstName,
            token: generateToken(userRegisted)
        })


    }
    catch (err) {

        return res.status(500).json({ success: false, message: `Server Error. ${err}` })

    }

}))

// fetch profile data (WHILE LOGGED IN)
userRouter.get('/info', isAuth, expressAsyncHandler(async (req, res) => {

    // verifies if email exist
    let user = await User.findById(req.user.userInfo._id, '-password -_id -updatedAt').populate('petsFound').populate('petsRegistered')

    if (!user) {

        return res.status(404).json(
            { success: false, message: 'User not found' }
        )

    }

    try {

        return res.status(200).json({ success: true, user })

    }
    catch (err) {

        return res.status(500).json({ success: false, message: `Server Error. ${err}` })

    }

}))

userRouter.get('/profile-info', expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.query.id, '-password -email -_id -createdAt -notifications').populate('petsFound')

    try {

        if (user) {

            return res.status(200).json({ success: true, profile: user, message: `Dados do Usuário Envidados.` })
        }
        else {

            return res.status(404).json({ success: false, message: `Esse usuário não existe.` })

        }

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `Server Error. ${error}` })

    }

}))

// updates user profile data 
userRouter.put('/update-profile', isAuth, expressAsyncHandler(async (req, res) => {

    try {

        const user = await User.findById(req.user.userInfo._id)

        // checks if password matchs with the one stored on server
        const passwordIsCorrect = await bcrypt.compare(req.body.currentPassword, user.password)

        if (!passwordIsCorrect) {

            return res.status(401).json({ success: false, message: 'Incorrect User Info Received' })

        }

        await user.update(req.body)

        return res.status(200).json(
            {
                success: true,
                message: 'Dados do Usuário Atualizado.'
            }
        )

    }
    catch (err) {

        return res.status(500).json({ success: false, message: `Server Error. ${err}` })

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

// delete the notification from user's account
userRouter.delete('/delete-notification', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userInfo._id)

    try {

        await user.notifications.find(item => item._id == req.body.notification._id).remove()

        await user.save()

        return res.status(200).json({ success: true, message: 'Notificação Apagada.' })

    }
    catch (error) {

        return res.status(500).json({ success: false, message: `Server Error. ${error}` })

    }

}))

export default userRouter;
