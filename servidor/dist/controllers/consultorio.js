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
exports.getListarConsultorioControllers = exports.vincularUsuario = exports.getConsultorioBusqueda = void 0;
const consultorio_1 = require("../services/consultorio");
const getConsultorioBusqueda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { LoginId } = req.params;
    //const {nomenclatura,informacion,activo,LoginId} = req.body;
    //OJO QUE AGREGE ESTA PARTE
    const activo = req.body.activo === req.body;
    const consultorio = yield (0, consultorio_1.getConsultorio)(req, res, LoginId, activo);
    //const consultorio = await getConsultorio(req,res,nomenclatura,activo)
    if (!consultorio) {
        return res.status(400).json({
            msg: `No existe consultorio: ${LoginId}, Revisa Nuevamente`
        });
    }
    res.status(200).json({ consultorio });
});
exports.getConsultorioBusqueda = getConsultorioBusqueda;
const vincularUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { LoginId, idconsultorios } = req.body;
    if (!LoginId || !idconsultorios) {
        return res.status(400).json({
            msg: `No existe LoginId: ${LoginId} y no existe consultorio ${idconsultorios}`
        });
    }
    yield (0, consultorio_1.vicularUsuarioBD)(res, LoginId, idconsultorios);
});
exports.vincularUsuario = vincularUsuario;
//!
const getListarConsultorioControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { LoginId } = req.params;
    console.log(LoginId);
    //const consultorios = await getListarConsultorioByLoginId(res, +LoginId);
    const consultorios = yield (0, consultorio_1.getListarConsultorioByLoginId)(res, req, +LoginId);
    return res.status(200).json({
        consultorios
    });
});
exports.getListarConsultorioControllers = getListarConsultorioControllers;
//!
