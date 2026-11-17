import express from 'express';

import UserController from '../controllers/UserController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

import roleMiddleware from '../middlewares/roleMiddleware.js';

import upload from '../middlewares/uploadMiddleware.js';


const router = express.Router();

const controller = new UserController();

router.get('/',   authMiddleware,   roleMiddleware,   controller.getAll)
router.get('/:uid',  authMiddleware, roleMiddleware,  controller.getById)
router.put('/:uid',  authMiddleware, roleMiddleware,  controller.update)
router.post('/', authMiddleware, roleMiddleware, controller.create)
router.delete('/:uid', authMiddleware, roleMiddleware, controller.delete)

router.post('/profileimage', authMiddleware,  upload.single('profileImage'), controller.uploadProfileImage);


export default router;