import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const PERSISTENCE = process.env.PERSISTENCE;
const NODE_ENV = process.env.NODE_ENV;

const SECRET_TOKEN_EMAIL = process.env.SECRET_TOKEN_EMAIL;
const EMAIL_ADMIN = process.env.EMAIL_ADMIN;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const config = {
    server: {
        port: PORT,
        persistence: PERSISTENCE
    },
    mongo: {
        url: MONGO_URL
    },
    auth: {
        account: ADMIN_MAIL,
        pass: ADMIN_PASSWORD,
        sessionSecret: SESSION_SECRET,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackUrl: CALLBACK_URL
    },
    environment: {
        nodeEnvironment: NODE_ENV
    },
    gmail:{
        emailToken: SECRET_TOKEN_EMAIL,
        emailAdmin: EMAIL_ADMIN,
        emailPass: EMAIL_PASSWORD
    },
}