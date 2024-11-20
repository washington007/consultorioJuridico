import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Consultorio from './consultorio';

interface ILoginAttributes {
  id: number
  correo: string
  clave: string
  nombre: string
  apellido: string
  activo: boolean
  idlogins?: string 
}

interface ILoginCreationAttributes extends Optional<ILoginAttributes, 'id'> {}
//const Usuario: ModelDefined<ILoginAttributes, ILoginCreationAttributes> = sequelize.define('Usuario', {
const Usuario = sequelize.define('Usuario', {

  idlogins: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rol: {
    type: DataTypes.ENUM('ADMIN_ROLE', 'USER_ROLE'),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuario',
  timestamps: true,
});

//Relaciones
//Usuario.hasOne(Consultorio, {foreignKey:'LoginId'});
 
// Exportar el modelo
export default Usuario;
