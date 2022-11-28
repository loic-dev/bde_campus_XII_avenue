

export const uploadImageMiddleware = async (req,res,next) => {
      try {

        console.log(req.files);
        

        next();

      } catch(e) {
            return res.status(401).json({error: e.message});
      }
  
}