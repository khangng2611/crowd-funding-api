import {connect} from 'mongoose';
import {} from 'dotenv/config'

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

async function connection () {
    try {
        await connect(`${mongoURL}${dbName}`);
        console.log("Successful DB Connection")
    } catch (error) {
        console.log("Failed DB Connection")
    }
}

export { connection }