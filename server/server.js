import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import petRouters from "./routers/petRouters.js";
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config();

const port = process.env.PORT || 5000

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(
    console.log('Mongoose Connected')
)

app.use(bodyParser.json());

app.use(cors());

app.use('/pets', petRouters)

app.listen(port, () => {

    console.log('Connected on: http://localhost:' + port)

})