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
exports.deleteListararchivo = exports.putListarArchivo = exports.updateListararchivo = exports.getListararchivo = exports.getListararchivosByConsultorioId = exports.createListararchivo = void 0;
const listararchivo_1 = __importDefault(require("../models/listararchivo"));
const createListararchivo = (req, res, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busqueda, nombres, fecha, opcion, ConsultorioId } = req.body;
        yield listararchivo_1.default.create({ busqueda, nombres, fecha, opcion, file: filePath, ConsultorioId });
        console.log('Guardado en base de datos exitoso');
    }
    catch (error) {
        console.error('Ocurrio un error al guardar en la base de datos ->', error);
    }
});
exports.createListararchivo = createListararchivo;
const getListararchivosByConsultorioId = (res, ConsultorioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('ConsultorioId', ConsultorioId);
        const listararchivos = yield listararchivo_1.default.findAll({ where: { ConsultorioId } });
        //@ts-ignore
        return listararchivos;
    }
    catch (error) {
        if (res)
            res.status(500).json({ message: 'Error al obtener los registros', error });
        return [];
    }
});
exports.getListararchivosByConsultorioId = getListararchivosByConsultorioId;
//Tomar en consiedracion que se obtiene un registro por ID
const getListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listararchivo = yield listararchivo_1.default.findByPk(id);
        if (!listararchivo) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json(listararchivo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el registro', error });
    }
});
exports.getListararchivo = getListararchivo;
const updateListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { busqueda, nombres, fecha, opcion, file, ConsultorioId } = req.body;
        const listararchivo = yield listararchivo_1.default.findByPk(id);
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
        yield listararchivo_1.default.update({ busqueda, nombres, fecha, opcion, file: filePath }, {
            where: {
                idlistararchivos
            }
        });
        yield listararchivo_1.default.update;
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
        const listararchivo = yield listararchivo_1.default.findByPk(id);
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
