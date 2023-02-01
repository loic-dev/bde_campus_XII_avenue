// importing the dependencies
import express from 'express';
import router from './src/routes/router.js'
import bodyparser from 'body-parser';
import cors from 'cors';
import path from 'path'
import helmet from 'helmet';
import morgan from 'morgan';
import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
export const app = express();


//express modules
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(morgan('combined'));



//HTTP router
app.use("/api", router);


app.get('/stream',function(req,res){

    // The path of the video from local file system
    const videoPath = path.join(__dirname, 'build/teaser.mp4');

    // 200 is OK status code and type of file is mp4
    res.writeHead(200, {'Content-Type': 'video/mp4'})

    // Creating readStream for th HTML video tag
    fs.createReadStream(videoPath).pipe(res)
})




//PUBLIC ROUTER
app.use('/public', express.static('public'));



//production import
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build')); 
  app.use('*', express.static('build')); // Added this     
}





//database connexion
export const database = new Pool({
  user: process.env.DB_USER,
  host:  process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
database.connect();


//starting the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.API_PORT, () => {console.log(`listening on port ${process.env.API_PORT}`);});
}
