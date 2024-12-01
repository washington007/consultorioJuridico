"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const consultorio_1 = __importDefault(require("./consultorio"));
const Archivo = connection_1.default.define('Archivo', {
    //!Ojo tomar en consideracion que se valigo los campos del registro 
    id_archivo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_hora_ingreso: {
        type: sequelize_1.DataTypes.DATE,
        // allowNull: false,
        // validate: {
        //   isDate: {
        //     args: true,
        //     msg: 'Debe ser una fecha valida'
        //   }
        // }
    },
    tipo_archivo: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   isIn: {
        //     args: [['xlsx', 'xlsm']],
        //     msg: 'El tipo de archivo debe ser xlsx o xlsm'
        //   }
        // }
    },
    archivo: {
        type: sequelize_1.DataTypes.STRING,
        //allowNull: false,
        // validate:{
        //   notNull:{
        //     msg: 'El nombre del archivo es obligatorio'
        //   }
        // }
    },
    id_consultorio: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'consultorio',
            key: 'id_consultorio'
        }
    },
    id_login: { type: sequelize_1.DataTypes.INTEGER, references: { model: 'usuario', key: 'id_login' } },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    tableName: 'archivo',
    timestamps: true,
});
// Definir la relación con Consultorio
Archivo.belongsTo(consultorio_1.default, { foreignKey: 'id_consultorio' });
// Exportar el modelo
exports.default = Archivo;
