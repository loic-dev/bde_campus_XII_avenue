// importing the dependencies
import express from 'express';
import router from './src/routes/router.js'
import bodyparser from 'body-parser';
import cors from 'cors';
import path from 'path'
import helmet from 'helmet';
import morgan from 'morgan';
import pkg from 'pg';
import ReactDOMServer from 'react-dom/server';
const { Pool } = pkg;
import { App } from '../../'




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


//PUBLIC ROUTER
app.use('/public', express.static('public'));


//production import
if(process.env.NODE_ENV === 'production'){
  
  app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App/>);
    const indexFile = path.resolve('./build/index.html');
  
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
  
  app.use(express.static('./build'));


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
if (process.env.NODE_ENV === 'developpment') {
    app.listen(process.env.API_PORT, () => {console.log(`listening on port ${process.env.API_PORT}`);});
}
