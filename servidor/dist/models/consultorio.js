"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const login_1 = __importDefault(require("./login"));
// const Consultorio: ModelDefined<IConsultorioAttributes, IConsultorioCreationAttributes> = sequelize.define('Consultorio', {
const Consultorio = connection_1.default.define('Consultorio', {
    idconsultorios: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomenclatura: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    informacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    LoginId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: true
    }
}, {
    tableName: 'consultorio',
    timestamps: true
});
// Relaciones
login_1.default.hasOne(Consultorio, { foreignKey: 'LoginId' });
Consultorio.belongsTo(login_1.default, { foreignKey: 'LoginId' });
exports.default = Consultorio;
