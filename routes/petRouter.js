import express from 'express';

import PetController from '../controllers/PetController.js';

const router = express.Router();

const controller = new PetController();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

export default router;