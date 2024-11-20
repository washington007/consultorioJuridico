import { Router } from 'express';
import { loginUser,createUser, getLoginId} from '../controllers/Login';

const router = Router();
router.post('/', createUser);
router.post('/login',loginUser)
router.get('/getLoginId/:correo',getLoginId)

export default router;