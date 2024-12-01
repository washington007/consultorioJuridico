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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarDuplicadoDB = exports.deleteListararchivo = exports.putListarArchivo = exports.updateListararchivo = exports.getListararchivosByConsultorioId = exports.createListararchivo = void 0;
const archivo_1 = __importDefault(require("../models/archivo"));
const timeUtils_1 = require("../utils/timeUtils");
const createListararchivo = (req, res, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha_hora_ingreso, tipo_archivo, archivo, id_consultorio, id_login } = req.body;
        const archivos = yield archivo_1.default.findAll({
            where: { fecha_hora_ingreso: (0, timeUtils_1.transformarFecha)(fecha_hora_ingreso), id_consultorio, id_login }
        });
        if (archivos.length > 0) {
            archivo_1.default.update({ fecha_hora_ingreso: (0, timeUtils_1.transformarFecha)(fecha_hora_ingreso), tipo_archivo, archivo: filePath, id_consultorio, id_login }, {
                where: { fecha_hora_ingreso: (0, timeUtils_1.transformarFecha)(fecha_hora_ingreso), id_consultorio, id_login }
            });
            return;
        }
        yield archivo_1.default.create({ fecha_hora_ingreso: (0, timeUtils_1.transformarFecha)(fecha_hora_ingreso), tipo_archivo, archivo: filePath, id_consultorio, id_login });
        console.log('Guardado en base de datos exitoso');
    }
    catch (error) {
        console.error('Ocurrio un error al guardar en la base de datos ->', error);
    }
});
exports.createListararchivo = createListararchivo;
const getListararchivosByConsultorioId = (res, id_consultorio) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('id_consultorio', id_consultorio);
        const listararchivos = yield archivo_1.default.findAll({ where: { id_consultorio } });
        //@ts-ignore
        return listararchivos;
    }
    catch (error) {
        if (res)
            res.status(500).json({ message: 'Error al obtener los registros!!!!!', error });
        return [];
    }
});
exports.getListararchivosByConsultorioId = getListararchivosByConsultorioId;
const updateListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { busqueda, nombres, fecha, opcion, file, ConsultorioId } = req.body;
        const listararchivo = yield archivo_1.default.findByPk(id);
        if (!listararchivo) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        yield listararchivo.update({ busqueda, nombres, fecha, opcion, file });
        res.status(200).json(listararchivo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el registro', error });
    }
});
exports.updateListararchivo = updateListararchivo;
const putListarArchivo = (req, res, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaArchivo = req.body;
        //console.log(req.body);
        const { busqueda, nombres, fecha, opcion, idlistararchivos } = listaArchivo;
        yield archivo_1.default.update({ busqueda, nombres, fecha, opcion, file: filePath }, {
            where: {
                idlistararchivos
            }
        });
        yield archivo_1.default.update;
        return true;
    }
    catch (error) {
        return error;
    }
});
exports.putListarArchivo = putListarArchivo;
const deleteListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listararchivo = yield archivo_1.default.findByPk(id);
        if (!listararchivo) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        yield listararchivo.destroy();
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el registro', error });
    }
});
exports.deleteListararchivo = deleteListararchivo;
const validarDuplicadoDB = (fecha_hora_ingreso, id_consultorio, id_login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivo = yield archivo_1.default.findAll({
            where: { fecha_hora_ingreso: (0, timeUtils_1.transformarFecha)(fecha_hora_ingreso), id_consultorio, id_login }
        });
        return archivo.length > 0; // Devuelve true si existen archivos, false si no hay ninguno
    }
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
        return undefined; // En caso de error, también devolvemos false
    }
});
exports.validarDuplicadoDB = validarDuplicadoDB;
