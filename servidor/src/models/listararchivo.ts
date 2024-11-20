import { DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Login from './login';
import Consultorio from './consultorio';

export interface IListarArchivoAttributes{
  id: number
  busqueda: string,
  nombres: string,
  fecha: string,
  opcion: string,
  file: string,
  idlistararchivos:string
}

interface IListarArchivoCreationAttributes extends Optional<IListarArchivoAttributes, 'id'> {}
const Archivo = sequelize.define('Archivo', {

  idlistararchivos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busqueda: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  opcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ConsultorioId: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'archivo',
  timestamps: true,
});

// Definir la relación con Consultorio
Archivo.belongsTo(Consultorio, { foreignKey: 'ConsultorioId' });

// Exportar el modelo
export default Archivo;
