import { Router } from 'express';
import * as PersonaController from '../controllers/persona.controller';

const router = Router();

router.get('/', PersonaController.getAllPersonas);
router.get('/:id', PersonaController.getPersonaById);
router.post('/', PersonaController.createPersona);
router.put('/:id', PersonaController.updatePersona);
router.delete('/:id', PersonaController.deletePersona);

export default router;
