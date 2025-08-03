import { Router } from 'express';
import * as AdopcionController from '../controllers/adopcion.controller';

const router = Router();

router.get('/', AdopcionController.getAllAdopciones);
router.get('/:id', AdopcionController.getAdopcionById);
router.post('/', AdopcionController.createAdopcion);
router.put('/:id', AdopcionController.updateAdopcion);
router.delete('/:id', AdopcionController.deleteAdopcion);

export default router;
