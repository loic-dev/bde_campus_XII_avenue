import { v4 as uuidv4 } from 'uuid';
import { insertImage } from '../models/images.model';


export const uploadImageMiddleware = async (req,res,next) => {
      try {

        let files = req.files;
        let authorizedType = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'];

        if(files.length > 3){
            throw new Error('Upload max 3 images')
        }

        files.forEach(async file => {
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


            const id_image = uuidv4();
            const link_image = file.path;

            let response = await insertImage(id_image,link_image);

            if(response.rowCount === 0){
                throw new Error('Something went wrong while the database insert image')
            }

        });

        next();

      } catch(e) {
            return res.status(401).json({error: e.message});
      }
  
}