"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const consultorio_1 = __importDefault(require("./consultorio"));
const Archivo = connection_1.default.define('Archivo', {
    idlistararchivos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    busqueda: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    opcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    ConsultorioId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    tableName: 'archivo',
    timestamps: true,
});
// Definir la relación con Consultorio
Archivo.belongsTo(consultorio_1.default, { foreignKey: 'ConsultorioId' });
// Exportar el modelo
exports.default = Archivo;
