import { Router } from 'express';
import * as RolController from '../controllers/rol.controller';

const router = Router();

router.get('/', RolController.getAllRoles);
router.get('/:id', RolController.getRolById);
router.post('/', RolController.createRol);
router.put('/:id', RolController.updateRol);
router.delete('/:id', RolController.deleteRol);

export default router;
