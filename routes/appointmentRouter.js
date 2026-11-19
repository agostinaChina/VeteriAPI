import express from 'express';

import AppointmentController from '../controllers/AppointmentController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddlware from '../middlewares/roleMiddleware.js';

const router = express.Router();

const controller = new AppointmentController();

router.get('/', authMiddleware, controller.getAll);

router.post('/', authMiddleware, controller.create);

router.delete('/:id', authMiddleware, roleMiddlware, controller.delete);

router.put('/:id', authMiddleware, roleMiddlware, controller.update);

export default router;