import { Router } from 'express';
import * as RegistroMovimientoController from '../controllers/registroMovimiento.controller';

const router = Router();

router.get('/', RegistroMovimientoController.getAllMovimientos);
router.get('/:id', RegistroMovimientoController.getMovimientoById);
router.post('/', RegistroMovimientoController.createMovimiento);
router.put('/:id', RegistroMovimientoController.updateMovimiento);
router.delete('/:id', RegistroMovimientoController.deleteMovimiento);

export default router;
