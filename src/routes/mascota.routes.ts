import { Router } from 'express';
import * as MascotaController from '../controllers/mascota.controller';

const router = Router();

router.get('/', MascotaController.getAllMascotas);
router.get('/:id', MascotaController.getMascotaById);
router.post('/', MascotaController.createMascota);
router.put('/:id', MascotaController.updateMascota);
router.delete('/:id', MascotaController.deleteMascota);

export default router;
