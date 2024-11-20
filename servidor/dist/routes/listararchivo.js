"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listararchivo_1 = require("../controllers/listararchivo");
const listararchivo_2 = require("../controllers/listararchivo");
const validarInformacionRepetida_1 = require("../middlewares/validarInformacionRepetida");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, listararchivo_1.getListararchivo);
//ESTA PARTE AGREGE
router.put('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, listararchivo_2.listararchivoUpdate);
router.get('/getArchivos/:LoginId', listararchivo_1.getListararchivosControllers);
exports.default = router;
