import { Router } from 'express';
import { getListararchivo, validarDuplicado} from '../controllers/archivo';
import { listararchivoUpdate } from '../controllers/archivo';
import { validaInformacionRepetida } from '../middlewares/validarInformacionRepetida';
import { upload } from '../middlewares/multer';

const router = Router();
router.post('/', upload.single('file') ,getListararchivo);
router.put('/', upload.single('file'),listararchivoUpdate);
router.get('/validarDuplicado',validarDuplicado);
export default router; 