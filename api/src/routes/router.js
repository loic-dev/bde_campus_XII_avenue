import express from 'express';
import {REGISTER,CONFIRM_EMAIL, LOGIN, AUTH} from '../constants/routes.constants.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authService } from '../services/auth/auth.service.js';
import { loginService } from '../services/auth/login.service.js';
import {registerService,confirmEmailService} from '../services/auth/register.service.js'

const router = express.Router();

//auth
router.post(REGISTER, registerService);
router.post(CONFIRM_EMAIL,confirmEmailService);
router.post(LOGIN,loginService);

//private route
router.get(AUTH, authMiddleware, authService);



export default router;




