import express from 'express';
import VeterinarianController from '../controllers/VeterinariansController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddlware from '../middlewares/roleMiddleware.js';

const router = express.Router()
const controller = new VeterinarianController();

router.get('/',     authMiddleware,     controller.getAll);
router.get('/:vid', authMiddleware,     controller.getById);
router.post('/',    authMiddleware, roleMiddlware, controller.create);

export default router;