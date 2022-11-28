import express from 'express';
import multer from 'multer';


import {REGISTER,CONFIRM_EMAIL, LOGIN, AUTH,GET_PARTNERS, GET_PANELS, GET_PARTNER, GET_PANEL, DELETE_PANEL, DELETE_PARTNER, CREATE_PANEL, CREATE_PARTNER} from '../constants/routes.constants.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadImageMiddleware } from '../middlewares/upload.middleware.js';
import { authService } from '../services/auth/auth.service.js';
import { loginService } from '../services/auth/login.service.js';
import {registerService,confirmEmailService} from '../services/auth/register.service.js'
import { createPanelService, deletePanelService, getAllPanelsService, getOnePanelService } from '../services/home/panels.service.js';
import { getAllPartnersService, getOnePartnerService, deletePartnerService, createPartnerService } from '../services/home/partners.service.js';

const multerImage = multer({ dest: "public/uploads/images" });

const router = express.Router();


//auth
router.post(REGISTER, registerService);
router.post(CONFIRM_EMAIL,confirmEmailService);
router.post(LOGIN,loginService);

    //private
    router.get(AUTH, authMiddleware, authService);

//home
router.get(GET_PARTNERS, getAllPartnersService);
router.get(GET_PANELS, getAllPanelsService);
router.get(GET_PARTNER, getOnePartnerService);
router.get(GET_PANEL, getOnePanelService);

    //private
    router.post(DELETE_PARTNER, authMiddleware, deletePartnerService);
    router.post(DELETE_PANEL, authMiddleware, deletePanelService);
    router.post(CREATE_PANEL, multerImage.array('pictures'), uploadImageMiddleware, createPanelService);
    router.post(CREATE_PARTNER, multerImage.array('pictures'), uploadImageMiddleware, createPartnerService);


export default router;




