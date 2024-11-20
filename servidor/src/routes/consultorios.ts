import { Router } from 'express';
import { getConsultorioBusqueda, vincularUsuario } from '../controllers/consultorio';

const router = Router();
router.get('/:LoginId', getConsultorioBusqueda);
router.patch('/vincular', vincularUsuario);
export default router;