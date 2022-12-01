import express from 'express';
import multer from 'multer';
import path from 'path';

import {REGISTER,CONFIRM_EMAIL, LOGIN, AUTH,GET_PARTNERS, GET_PANELS, GET_PARTNER, GET_PANEL, DELETE_PANEL, DELETE_PARTNER, CREATE_PANEL, CREATE_PARTNER, CREATE_EVENT} from '../constants/routes.constants.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadImageMiddleware } from '../middlewares/upload.middleware.js';
import { createEventService } from '../services/admin/events.service.js';
import { authService } from '../services/auth/auth.service.js';
import { loginService } from '../services/auth/login.service.js';
import {registerService,confirmEmailService} from '../services/auth/register.service.js'
import { createPanelService, deletePanelService, getAllPanelsService, getOnePanelService } from '../services/home/panels.service.js';
import { getAllPartnersService, getOnePartnerService, deletePartnerService, createPartnerService } from '../services/home/partners.service.js';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
        let id = (Math.random() + 1).toString(36).substring(7);
        cb(null, Date.now() + id + path.extname(file.originalname));
    }
})
const multerImage = multer({ storage: storage });

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
    router.post(CREATE_PANEL, authMiddleware, multerImage.any('pictures'), uploadImageMiddleware, createPanelService);
    router.post(CREATE_PARTNER, authMiddleware, multerImage.any('pictures'), uploadImageMiddleware, createPartnerService);


//event


    //private
    router.post(CREATE_EVENT, authMiddleware, multerImage.any('pictures'), uploadImageMiddleware, createEventService);


export default router;




