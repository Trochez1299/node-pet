import { Router } from 'express';
import * as DesparasitacionController from '../controllers/desparasitacion.controller';

const router = Router();

router.get('/', DesparasitacionController.getAllDesparasitaciones);
router.get('/:id', DesparasitacionController.getDesparasitacionById);
router.post('/', DesparasitacionController.createDesparasitacion);
router.put('/:id', DesparasitacionController.updateDesparasitacion);
router.delete('/:id', DesparasitacionController.deleteDesparasitacion);

export default router;
