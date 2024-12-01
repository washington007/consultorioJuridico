import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

//Generamos token tomar en cuenta  que esta hecho en el controller

// const token = jwt.sign({
//     correo: correo
// },process.env.SECRET_KEY || 'cisco');
// res.json({token,LoginId:login.getDataValue('id_login')});

export const validarAdmin_Rol = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        //Ojo tomar en cuenta con el find 
        // const usuarioDB = await Usuario.findAll();
        // const {rol} =req.body;
        
        // if(!usuarioDB){
        //     res.status(404).json({
        //         ok:false,
        //         message: 'Usuario no existe'
        //     });
        // }
        // if(!usuarioDB.rol !== 'Usuario'){
        //     return res.status(404).json({
        //         ok: false,
        //         msg:'No tienes privilegios'
        //     })
        // }
        // next();

    }catch (error){
        // res.status(500).json({
        //     message: 'Ocurrio un error'
        // });
    }
}

module.exports = {
    //validarJWT,
    validarAdmin_Rol
}