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

  const range = req.headers.range;
      if (!range) {
          res.status(400).send("Require Range Header");
          return
      }

      const videoPath = 'build/teaser.mp4';
      const videoSize = fs.statSync(videoPath).size;

      const CHUNK_SIZE = 10 ** 6 // 10 power of 6 is 1MB
      const start = Number(range.replace(/\D/g, ""));// replace all non-digit characters to empty string and parse into Number

      // calculate the ending byte we want to response back to client. If it reached the end of file (total video size)
      //Then send back the video size instead
      const end = Math.min(videoSize - 1, start + CHUNK_SIZE);
      const contentLength = end - start + 1;
      const header = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,        
          "Accept-Range": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
      };
      res.writeHead(206, header)
      const readStream = fs.createReadStream(videoPath, { start, end });
      readStream.pipe(res)
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
