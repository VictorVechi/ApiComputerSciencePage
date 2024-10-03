import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import Database from './config/Database.js';

config();

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URI
Database.validate(URL);

const app = express();


await mongoose.connect(URL)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json());
app.use(cors('*'));
