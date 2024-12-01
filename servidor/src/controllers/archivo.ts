import { Request, Response } from "express";
import { createListararchivo, getListararchivosByConsultorioId, validarDuplicadoDB} from "../services/archivo";
import { putListarArchivo } from "../services/archivo";
const nodeMailer = require('nodemailer');


export const getListararchivo = async (req: Request, res: Response) => {
    const { busqueda, nombres, fecha, opcion, correo} = req.body;
    const file = req.file
    if (!file) {
        return res.status(400).json({ msg: 'No se ha proporcionado un archivo Excell' });
    }
        
    const transporter = nodeMailer.createTransport({
        host:'mail.defensoria.gob.ec',
        port:25,
        secure:false,
        auth:{
            user:'wpilco@defensoria.gob.ec',
            pass:'Zoquet2hñ.ñ'
        }
    });
    
    const mailOptions = {
        from:'wpilco@defensoria.gob.ec',
        to: correo,
        subject:'Correo de Prueba',
        text:`"Hemos tenido el placer de recibir información sobre lo siguiente:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
        attachments:[
            {
                //OJO TOMAR EN CUENTA EL ATACHMENT 
                filename: file.filename,
                path: file.path,
                contentDisposition:'attachment'
            }, 
        ]
    };

    try{
        await createListararchivo(req, res, file.path)
        await transporter.sendMail(mailOptions);
        return res.json({
        msg: `El formulario ${busqueda} ${nombres} ${fecha} ${opcion} ${file} a sido creado exitosamente`
        });
    }catch (error){
        return res.status(500).json({
            msg: 'Hubo un error al enviar la informacion',error:error,
        });
    }    
};

//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
export const listararchivoUpdate = async (req: Request, res: Response) =>{
    try{
        const { busqueda, nombres, fecha, opcion, correo, ConsultorioId } = req.body;
        
        if (!busqueda || !nombres || !fecha || !opcion || !ConsultorioId) {
            throw new Error ('Todos los campos son requeridos') 
        }
        const file = req.file;

        if(!file){
            return res.status(400).json({msg: 'No se a proporcionado un archivo de Excell'})
        }
    
        const transporter = nodeMailer.createTransport({
            host:'mail.defensoria.gob.ec',
            port:25,
            secure:false,
            auth:{
                user:'wpilco@defensoria.gob.ec',
                pass:'Zoquet2hñ.ñ'
            }
        });
        
            
        const mailOptions = {
            from:'wpilco@defensoria.gob.ec',
            to: correo,
            subject:'Correo de Prueba Actualizacion',
            text:`"Hemos tenido el placer de Actualizar su información:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
            attachments:[
                {
                    //OJO TOMAR EN CUENTA EL ATACHMENT 
                    filename: file.filename,
                    path: file.path,
                    contentDisposition:'attachment'
                }, 
            ]
        };

        try{
            const response = await putListarArchivo(req, res, file.path) as any
            if(response.message){
                return res.status(400).json({mensaje: 'Ocurrio un error al Actualizar el archivo'});  
            }
    
            await transporter.sendMail(mailOptions);
            return res.status(200).json({mensaje: 'El archivo se actualizo correctamente'});  
        }catch (error){
            return res.status(500).json({
                msg: 'Hubo un error al enviar la informacion',
            });
        }

    }catch(error){
        res.status(400).json({mensaje: 'Ocurrio un error al Actualizar el archivo'});  
    }
};

export const validarDuplicado = async (req: Request, res: Response): Promise<Response> => { 
    const { fecha_hora_ingreso, id_consultorio, id_login } = req.query as { 
        fecha_hora_ingreso?: string, id_consultorio?: string, id_login?: string 
    }; 
    if (!fecha_hora_ingreso || !id_consultorio || !id_login) { 
        return res.status(400).json({ mensaje: 'Ocurrió un error al validar el duplicado' });
     } 
     try { 
        const existeDuplicado = await validarDuplicadoDB(fecha_hora_ingreso, id_consultorio, id_login); 
        return res.status(200).json({ duplicado: existeDuplicado }); 
    } catch (error) { 
        console.error('Error al validar duplicado:', error); 
        return res.status(500).json({ 
            mensaje: 'Error interno del servidor' });
         } 
    };