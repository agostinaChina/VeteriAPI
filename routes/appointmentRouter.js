import express from 'express';

import AppointmentController from '../controllers/AppointmentController.js';

const router = express.Router();

const controller = new AppointmentController();

router.get('/', controller.getAll);

router.post('/', controller.create);

router.delete('/:id', controller.delete);

export default router;