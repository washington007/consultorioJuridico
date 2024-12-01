"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAdmin_Rol = void 0;
//Generamos token tomar en cuenta  que esta hecho en el controller
// const token = jwt.sign({
//     correo: correo
// },process.env.SECRET_KEY || 'cisco');
// res.json({token,LoginId:login.getDataValue('id_login')});
const validarAdmin_Rol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        // res.status(500).json({
        //     message: 'Ocurrio un error'
        // });
    }
});
exports.validarAdmin_Rol = validarAdmin_Rol;
module.exports = {
    //validarJWT,
    validarAdmin_Rol: exports.validarAdmin_Rol
};
