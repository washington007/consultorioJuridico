import { Router } from 'express';
import { loginUser,createUser, getLoginId, vincularConsultorio, getConsultorio, obtenerUsuarios} from '../controllers/usuario';

const router = Router();
router.get('/', obtenerUsuarios);
router.get('/getLoginId/:correo',getLoginId);
router.get('/getConsultorio/:id_login',getConsultorio);
//OJO agrege esta parte 
// router.get('/',validarJWT,getUsuarios);
//Esta parte agregue 
router.post('/', createUser);
router.post('/login',loginUser);
router.patch('/vincular', vincularConsultorio);

export default router;