import { IConfig } from "./IConfig";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });


let config: IConfig = {
    credential: {
        testUser: {
            userMailId: process.env.TEST_USER_MAIL_ID || '',
            password: process.env.TEST_USER_PASSWORD || ''
        }
    },
    api: {
        baseUrl: 'https://api-core-dev.caronsale.de/api'
    }
}

export default config;