import multer from  'multer';
import path from 'path';
import { getListararchivosByConsultorioId } from '../services/archivo';
import { log } from 'console';
const fs = require ('fs')

const storage = multer.diskStorage({

    destination: (req, file, cb ) =>{
        const{busqueda} = req.body;
        const subCarpeta = path.join(path.join(__dirname,'../../public/uploads'),busqueda)
        fs.mkdirSync(subCarpeta,{recursive:true})
        cb(null,subCarpeta);
    },
    
    filename: async (req, file, cb) =>{
        const{busqueda, nombres, fecha_hora_ingreso, tipo_archivo, id_login} = req.body;
        
        console.log('multerLoginId',id_login);
        //const filename = `${busqueda.originalname}_${fecha.originalname}_${opcion.originalname}.xlsx`;
        //Agrege esta parte 
        let extension = file.originalname.split('.').pop();
        if(extension !== 'xlsm' && extension !== 'xlsx'){
            extension = 'xlsx';
        }
        const filename = `${busqueda}_${fecha_hora_ingreso}_${tipo_archivo}_${id_login}.${extension}`;
        console.log('Mensaje',filename,file);
        
        //const filename = `${busqueda}_${nombres.replace(/"/g,'')}_${fecha}_${opcion}_${file.originalname.replace(/"/g,'')}`
        cb(null,filename);
    }
});

export const upload=multer({storage});
