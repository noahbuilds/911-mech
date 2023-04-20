import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const configuration = {
    ENV_PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    USER_EMAIL: process.env.USER_EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

export default configuration;
