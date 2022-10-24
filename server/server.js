import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import petRouter from "./routers/petRouter.js";
import userRouter from "./routers/userRouter.js";
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config();

const port = 5000 //testes
// const port = process.env.PORT

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(
    console.log('MongoDB Connected')
)

app.use(bodyParser.json());

app.use(cors());

app.use('/pets', petRouter)
app.use('/user', userRouter)

app.listen(port, () => {

    console.log('Connected on: http://localhost:' + port)

})