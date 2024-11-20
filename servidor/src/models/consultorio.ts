import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Usuario from './login';
import Archivo from './listararchivo';

export interface IConsultorioAttributes{
  id: number
  nomenclatura:string
  informacion: string 
  activo: boolean
  idconsultorios?: string
}

interface IConsultorioCreationAttributes extends Optional <IConsultorioAttributes, 'id'> {}
// const Consultorio: ModelDefined<IConsultorioAttributes, IConsultorioCreationAttributes> = sequelize.define('Consultorio', {
const Consultorio = sequelize.define('Consultorio', {

  idconsultorios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomenclatura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  informacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  LoginId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true
  }
}, {
  tableName: 'consultorio',
  timestamps: true
});

 // Relaciones
 Usuario.hasOne(Consultorio, {foreignKey: 'LoginId'});
 Consultorio.belongsTo(Usuario, {foreignKey: 'LoginId'});

export default Consultorio;
