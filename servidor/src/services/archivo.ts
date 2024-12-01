import { Request, Response } from 'express';
import Listararchivo, { IListarArchivoAttributes } from '../models/archivo';
import { transformarFecha } from '../utils/timeUtils';
import { listararchivoUpdate } from '../controllers/archivo';

export const createListararchivo = async (req: Request, res: Response, filePath: string) => {
  try {
    const { fecha_hora_ingreso, tipo_archivo, archivo, id_consultorio, id_login } = req.body;
    const archivos = await Listararchivo.findAll({ 
      where: { fecha_hora_ingreso:transformarFecha(fecha_hora_ingreso), id_consultorio, id_login }
  });
  
  if(archivos.length > 0){
    Listararchivo.update({ fecha_hora_ingreso:transformarFecha(fecha_hora_ingreso), tipo_archivo, archivo: filePath, id_consultorio, id_login},
    {
      where: { fecha_hora_ingreso:transformarFecha(fecha_hora_ingreso), id_consultorio, id_login }
    }
    );
    return
  }
    
    await Listararchivo.create({ fecha_hora_ingreso:transformarFecha(fecha_hora_ingreso), tipo_archivo, archivo: filePath, id_consultorio, id_login});
    console.log('Guardado en base de datos exitoso')
  } catch (error) {
    console.error('Ocurrio un error al guardar en la base de datos ->', error)
  }
};

export const getListararchivosByConsultorioId = async (res: Response | undefined, id_consultorio:number):Promise<IListarArchivoAttributes[]> => {
  try {
    console.log('id_consultorio', id_consultorio);
    const listararchivos = await Listararchivo.findAll({where: {id_consultorio}});
    //@ts-ignore
    return listararchivos as IListarArchivoAttributes[];
  } catch (error) {
    if(res) res.status(500).json({ message: 'Error al obtener los registros!!!!!', error });
    return []
  }
};

export const updateListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { busqueda, nombres, fecha, opcion, file, ConsultorioId } = req.body;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await listararchivo.update({busqueda,nombres,fecha,opcion,file})
    res.status(200).json(listararchivo);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};

export const putListarArchivo = async (req: Request, res: Response, filePath:string) =>{
    try {
        const listaArchivo = req.body;
        //console.log(req.body);
        const { busqueda, nombres, fecha, opcion, idlistararchivos } = listaArchivo;

        await Listararchivo.update(
            {busqueda,nombres,fecha, opcion, file:filePath},
            {
              where: {
                idlistararchivos
              }
            }
        );

      await Listararchivo.update
        return true;
        
    }catch (error){
      return error;
    }
};

export const deleteListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await listararchivo.destroy();
    res.status(200).json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro', error });
  }
};

export const validarDuplicadoDB = async (fecha_hora_ingreso: string, id_consultorio: string, id_login: string) => {
  try {
      const archivo = await Listararchivo.findAll({ 
          where: { fecha_hora_ingreso:transformarFecha(fecha_hora_ingreso), id_consultorio, id_login }
      });
      
      return archivo.length > 0; // Devuelve true si existen archivos, false si no hay ninguno
  } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      return undefined; // En caso de error, también devolvemos false
  }
};

