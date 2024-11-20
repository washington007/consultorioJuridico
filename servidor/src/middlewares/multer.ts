import multer from  'multer';
import path from 'path';
//!Ojo que se cambio en la linea 14 tomar en consideracion  
// import { getListararchivosByLoginId } from '../services/listararchivo';
import { getListararchivosByConsultorioId } from '../services/listararchivo';
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
        const{busqueda, nombres, fecha, opcion, LoginId} = req.body;
        
        console.log('multerLoginId',LoginId);
        //const filename = `${busqueda.originalname}_${fecha.originalname}_${opcion.originalname}.xlsx`;
        const filename = `${busqueda}_${fecha}_${opcion}_${LoginId}.xlsx`
        //const filename = `${busqueda}_${nombres.replace(/"/g,'')}_${fecha}_${opcion}_${file.originalname.replace(/"/g,'')}`
        cb(null,filename);
    }
});

export const upload=multer({storage});
