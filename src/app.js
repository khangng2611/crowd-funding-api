import express from 'express';
import { connection } from './db_config.js'; 
import { router } from './router.js';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import {} from 'dotenv/config'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000; 

connection();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(fileUpload());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
