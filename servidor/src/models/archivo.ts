import { DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Consultorio from './consultorio';

export interface IListarArchivoAttributes{
  id: number
  fecha_hora_ingreso: string,
  tipo_archivo: string,
  archivo: string,
  id_archivo:string
}

interface IListarArchivoCreationAttributes extends Optional<IListarArchivoAttributes, 'id'> {}
const Archivo = sequelize.define('Archivo', {
//!Ojo tomar en consideracion que se valigo los campos del registro 
  id_archivo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_hora_ingreso: {
    type: DataTypes.DATE,
    // allowNull: false,
    // validate: {
    //   isDate: {
    //     args: true,
    //     msg: 'Debe ser una fecha valida'
    //   }
    // }
  },
  tipo_archivo: {
    type: DataTypes.STRING,
    // allowNull: false,
    // validate: {
    //   isIn: {
    //     args: [['xlsx', 'xlsm']],
    //     msg: 'El tipo de archivo debe ser xlsx o xlsm'
    //   }
    // }
  },
  archivo: {
    type: DataTypes.STRING,
    //allowNull: false,
    // validate:{
    //   notNull:{
    //     msg: 'El nombre del archivo es obligatorio'
    //   }
    // }
  },
  id_consultorio: {
    type: DataTypes.INTEGER,
    references:{
      model: 'consultorio',
      key: 'id_consultorio'
    }
  },
  id_login: { type: DataTypes.INTEGER, references: { model: 'usuario', key: 'id_login' } },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'archivo',
  timestamps: true,
});

// Definir la relación con Consultorio
Archivo.belongsTo(Consultorio, { foreignKey: 'id_consultorio' });

// Exportar el modelo
export default Archivo;
