import "reflect-metadata";
import { config } from 'dotenv';
import cors from 'cors';
import Database from './infra/config/Database';
import app from './infra/controllers/Server';

config();

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URI



Database.connect(URL);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(cors());
