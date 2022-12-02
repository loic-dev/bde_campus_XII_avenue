import { v4 as uuidv4 } from 'uuid';
import { insertImage } from '../models/images.model.js';


export const uploadImageMiddleware = async (req,res,next) => {
      try {

        if(req.files.length === 0){
            return next();
        }

        let files = req.files;
        let authorizedType = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'];

        if(files.length > 1){
            throw new Error('Upload max 1 image')
        }

        let id_image = null;
        let file = files[0];
        
        let size = file.size;
        let mimetype = file.mimetype;


        //max 1 MB
        if(size > 1000000){
            throw new Error('Image max 1mb')
        }

        //bad image type
        if(!authorizedType.includes(mimetype)){
            throw new Error('Bad image type, type authorized : (png, jpeg, webp and bmp )')
        }

        id_image = uuidv4();
        const link_image = file.path;
        let response = await insertImage(id_image,link_image);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert image')
        }

        req.id_image = id_image;

        return next();

      } catch(e) {
            console.log(e)
            return res.status(401).json({error: e.message});
      }
  
}