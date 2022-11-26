import express from 'express';
import {REGISTER,CONFIRM_EMAIL, LOGIN, AUTH,GET_PARTNERS, GET_PANELS, GET_PARTNER, GET_PANEL} from '../constants/routes.constants.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authService } from '../services/auth/auth.service.js';
import { loginService } from '../services/auth/login.service.js';
import {registerService,confirmEmailService} from '../services/auth/register.service.js'
import { getAllPanelsService } from '../services/home/panels.service.js';
import { getAllPartnersService } from '../services/home/partners.service.js';


const router = express.Router();

//auth
router.post(REGISTER, registerService);
router.post(CONFIRM_EMAIL,confirmEmailService);
router.post(LOGIN,loginService);

//home
router.get(GET_PARTNERS, getAllPartnersService);
router.get(GET_PANELS, getAllPanelsService);
router.get(GET_PARTNER, get);
router.get(GET_PANEL, getAllPanelsService);


//private route
router.get(AUTH, authMiddleware, authService);



export default router;




