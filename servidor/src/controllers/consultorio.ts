import { Request, Response} from 'express';
import { getConsultorio, getListarConsultorioByLoginId, vicularUsuarioBD } from '../services/consultorio';

export const getConsultorioBusqueda = async (req: Request, res: Response) => {
    const {LoginId} = req.params;
    //const {nomenclatura,informacion,activo,LoginId} = req.body;
    //OJO QUE AGREGE ESTA PARTE
    const activo = req.body.activo === req.body;
    const consultorio = await getConsultorio(req, res, LoginId, activo);
    //const consultorio = await getConsultorio(req,res,nomenclatura,activo)
    
    if(!consultorio){
        return res.status(400).json({
            msg: `No existe consultorio: ${LoginId}, Revisa Nuevamente`
        })
    }
    res.status(200).json({consultorio});  
}

export const vincularUsuario = async (req: Request, res: Response) => {
    const {LoginId,idconsultorios} = req.body;
    if(!LoginId || !idconsultorios){
        return res.status(400).json({
            msg: `No existe LoginId: ${LoginId} y no existe consultorio ${idconsultorios}`
        })
    }
    
    await vicularUsuarioBD(res, LoginId, idconsultorios);
}



//!
export const getListarConsultorioControllers = async(req: Request, res: Response) =>{
    const {LoginId} = req.params;
    console.log(LoginId);
    
    //const consultorios = await getListarConsultorioByLoginId(res, +LoginId);
    const consultorios = await getListarConsultorioByLoginId(res, req, +LoginId)
    return res.status(200).json({
        consultorios
    });
}
//!

