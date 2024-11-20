import { Request, Response } from 'express';
import Listararchivo, { IListarArchivoAttributes } from '../models/listararchivo';

export const createListararchivo = async (req: Request, res: Response, filePath: string) => {
  try {
    const { busqueda, nombres, fecha, opcion, ConsultorioId } = req.body;
    await Listararchivo.create({ busqueda, nombres, fecha, opcion, file: filePath, ConsultorioId });
    console.log('Guardado en base de datos exitoso')
  } catch (error) {
    console.error('Ocurrio un error al guardar en la base de datos ->', error)
  }
};

export const getListararchivosByConsultorioId = async (res: Response | undefined, ConsultorioId:number):Promise<IListarArchivoAttributes[]> => {
  try {
    console.log('ConsultorioId', ConsultorioId);
    const listararchivos = await Listararchivo.findAll({where: {ConsultorioId}});
    //@ts-ignore
    return listararchivos as IListarArchivoAttributes[];
  } catch (error) {
    if(res) res.status(500).json({ message: 'Error al obtener los registros', error });
    return []
  }
};

//Tomar en consiedracion que se obtiene un registro por ID
export const getListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.status(200).json(listararchivo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
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

