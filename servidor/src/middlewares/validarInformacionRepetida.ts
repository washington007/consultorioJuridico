import { NextFunction } from "express";
import { Request, Response } from "express";
//import { getListararchivosByLoginId } from "../services/listararchivo";
import { getListararchivosByConsultorioId } from "../services/listararchivo";

export const validaInformacionRepetida = async(req: Request, res: Response, next:NextFunction) =>{
    try{
        // const { busqueda,fecha,opcion,LoginId } = req.body;
        // console.log('el body',req.body);
        const {busqueda, nombres, fecha, opcion, ConsultorioId} = req.body;
        console.log('El body',req.body);
        
        
        //const archivosExistentes = await getListararchivosByLoginId(res, LoginId) 
        const archivosExistentes = await getListararchivosByConsultorioId(res, ConsultorioId) 
          
        if(archivosExistentes.some(archivo => archivo.busqueda === busqueda)) {
          //if(archivosExistentes.some(archivo => archivo.fecha === fecha)){
            //if(archivosExistentes.some(archivo => archivo.opcion === opcion)){
                return res.status(404).json({
                message: 'Informacion Repetida en el Try'
              });
            //}
         //}
        }
        next();
    }catch(error){
        res.status(404).json({
        message: 'Informacion Repetida en el Catch'
        });
    }
}