import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'

import {REGISTER,CONFIRM_EMAIL, LOGIN, AUTH,GET_PARTNERS, GET_PANELS, GET_PARTNER, GET_PANEL, DELETE_PANEL, DELETE_PARTNER, CREATE_PANEL, CREATE_PARTNER, CREATE_EVENT, GET_EVENTS, GET_EVENT, GET_NEXT_EVENT, MODIFY_EVENT, DELETE_EVENT, CREATE_REGISTER, GET_REGISTERS, GET_REGISTER, DELETE_REGISTER, MODIFY_REGISTER} from '../constants/routes.constants.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadImageMiddleware } from '../middlewares/upload.middleware.js';
import { createEventService, deleteEventService, getAllEventsService, getNextEventService, getOneEventService, modifyOneEventService } from '../services/admin/events.service.js';
import { authService } from '../services/auth/auth.service.js';
import { loginService } from '../services/auth/login.service.js';
import {registerService,confirmEmailService} from '../services/auth/register.service.js'
import { createPanelService, deletePanelService, getAllPanelsService, getOnePanelService } from '../services/home/panels.service.js';
import { getAllPartnersService, getOnePartnerService, deletePartnerService, createPartnerService } from '../services/home/partners.service.js';
import { createRegisterService, deleteRegisterService, getAllRegistersService, getOneRegisterService, modifyOneRegisterService } from '../services/admin/register.service.js';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let directory = './public/uploads/images'
        fs.mkdirSync(directory, { recursive: true })
        cb(null, directory)
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
router.get(GET_EVENTS, getAllEventsService);
router.get(GET_EVENT, getOneEventService);
router.get(GET_NEXT_EVENT, getNextEventService);

    //private
    router.post(CREATE_EVENT, authMiddleware, multerImage.any('pictures'), uploadImageMiddleware, createEventService);
    router.post(MODIFY_EVENT, authMiddleware, multerImage.any('pictures'), uploadImageMiddleware, modifyOneEventService);
    router.post(DELETE_EVENT, authMiddleware, deleteEventService);

   
//register
router.post(CREATE_REGISTER, createRegisterService);

    //private
    router.get(GET_REGISTERS, authMiddleware, getAllRegistersService);
    router.get(GET_REGISTER,authMiddleware, getOneRegisterService);
    router.post(MODIFY_REGISTER, authMiddleware, modifyOneRegisterService);
    router.post(DELETE_REGISTER, authMiddleware, deleteRegisterService);

export default router;




