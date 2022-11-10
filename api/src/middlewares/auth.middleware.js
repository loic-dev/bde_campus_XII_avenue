
import jwt  from 'jsonwebtoken';

export const authMiddleware = async (req,res,next) => {
      try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = null;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch(e) {
            console.log(e)
            throw new Error("Error JWT");
        }

        
        const userId = decodedToken.userId;

        let user = await getUserById(userId);
        if(user.rowLength === 0){
            console.log("userId don't exist", userId);
            throw new Error("UserId don't exist");
        }

        if(user.rows[0].email_confirmed === false){
            console.log("user email hasn't been confirmed", userId);
            throw new Error("User email hasn't been confirmed");
        }

        next();

      } catch(e) {
            return res.status(401).json({error: e.message});
      }
  
}