import { Router } from 'express';
import { getListararchivo, getListararchivosControllers} from '../controllers/listararchivo';
import { listararchivoUpdate } from '../controllers/listararchivo';
import { validaInformacionRepetida } from '../middlewares/validarInformacionRepetida';
import { upload } from '../middlewares/multer';

const router = Router();
router.post('/', upload.single('file') ,validaInformacionRepetida,getListararchivo);

//ESTA PARTE AGREGE
router.put('/', upload.single('file'),validaInformacionRepetida,listararchivoUpdate);
router.get('/getArchivos/:LoginId', getListararchivosControllers);

export default router; 