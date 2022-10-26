import express from 'express'
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils.js'

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
            contact: {
                tel1: req.body.contact.tel1,
                tel2: req.body.contact.tel2,
                email: req.body.contact.email,
                instagram: req.body.contact.instagram,
                facebook: req.body.contact.facebook
            },
        })

        await newUser.save()

        return res.status(201).json({
            name: newUser.name,
            token: generateToken(newUser)
        })

    }
    catch (err) {

        return res.status(500).json({ message: err })

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

export default userRouter;