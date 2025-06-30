import "reflect-metadata";
import { config } from 'dotenv';
import cors from 'cors';
import Database from './infra/config/Database';
import app from './infra/controllers/Server';

config();

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DBNAME,
} = process.env;

const URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

const PORT = process.env.PORT || 8080;

Database.connect(URL);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(cors());
