import { Router } from 'express';
import { getListararchivo} from '../controllers/archivo';
import { listararchivoUpdate } from '../controllers/archivo';
import { validaInformacionRepetida } from '../middlewares/validarInformacionRepetida';
import { upload } from '../middlewares/multer';

const router = Router();
router.post('/', upload.single('file') ,getListararchivo);
router.put('/', upload.single('file'),listararchivoUpdate);
export default router; 