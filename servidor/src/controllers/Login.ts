import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createLogin, getLoginByCorreo } from '../services/login';
import Usuario from '../models/login';
    
export const createUser = async (req: Request, res: Response) => {
    //const { correo, clave } = req.body;
    const { correo, clave, nombre, apellido, activo} = req.body;
    //const login = await getLoginByCorreo(correo, res)
    const login = await getLoginByCorreo(correo, activo, res)
 
    if(login){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${correo}`
        })
    }

    const hashedPassword = await bcrypt.hash(clave, 10);
    console.log(hashedPassword);
    try{
        await createLogin(req,res,correo, hashedPassword)
        res.json({
            msg: 'Nuevo Usuario'
         })
    }catch(error){
        res.status(500).json({
            msg:'Ocurrio un error',
            error
        })
    }    
}   

export const loginUser = async (req: Request, res: Response) => {
    const {correo, clave, activo} = req.body;
    //Validamos si el usuario existe en la base de datos 
    const login = await getLoginByCorreo(correo,activo,res)
    if(!login){
        return res.status(400).json({
            msg: `No existe vuelve a intentar!`
        })
    }    
    
    //TODO
    //Validamos password
    //const passwordValid = await bcrypt.compare(clave, login.getDataValue('clave'))
    const  passwordValid = await bcrypt.compare(clave, login.getDataValue('clave'))
    if(!passwordValid){
        return res.status(400).json({
            msg: `Contraseña Incorrecta!`
        })
    }
    
    //Generamos token
    const token = jwt.sign({
        correo: correo
    },process.env.SECRET_KEY || 'cisco');
    res.json({token,LoginId:login.getDataValue('idlogins')});
}

export const getLoginId = async(req:Request, res: Response)=>{
    const {correo} = req.params;
    //const login = await getLoginByCorreo(correo, res);
    const {activo} = req.query;
    const login = await getLoginByCorreo(correo,activo == 'true',res);
    return res.status(200).json({
        loginId: login?.getDataValue('idlogins')
    })
}   
